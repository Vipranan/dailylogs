#!/usr/bin/env python3
import json
from pdf2image import convert_from_path
import pytesseract
import re
from concurrent.futures import ThreadPoolExecutor

CHAPTER_MAP = {
    1: ("Chapter 1 - Definitions And Abbreviations", 1, 34),
    2: ("Chapter 2 - International Organisations and Conventions", 35, 60),
    3: ("Chapter 3 - Aircraft Nationality and Registration Marks", 61, 66),
    4: ("Chapter 4 - Rules of the Air", 67, 120),
    5: ("Chapter 5 - Air Traffic Services", 121, 152),
    6: ("Chapter 6 - Area Control Service", 153, 176),
    7: ("Chapter 7 - Approach Control Service", 177, 186),
    8: ("Chapter 8 - Procedures for Aerodrome Control Service", 187, 202),
    9: ("Chapter 9 - Use of Air Traffic Services Surveillance System", 203, 216),
    10: ("Chapter 10 - Aeronautical Information Services", 217, 236),
    11: ("Chapter 11 - Search and Rescue", 237, 246),
    12: ("Chapter 12 - Visual Aids for Navigation", 247, 306),
    13: ("Chapter 13 - Procedures for Air Navigation Services", 307, 348),
}

PDF_PATH = "/Users/nancypravin/Downloads/Regs_ROA_DGCA.pdf"
OUTPUT_PATH = "/Users/nancypravin/kact/dailylogs/instruments/air-regulations.json"


def process_chapter(ch_num, title, start, end):
    print(f"Processing {title}")
    images = convert_from_path(PDF_PATH, dpi=150, first_page=start, last_page=end)
    text = "\n".join(pytesseract.image_to_string(img) for img in images)

    lines = text.split("\n")
    sections, current_title, current_content = [], None, []
    started = False

    for line in lines:
        line = line.strip()
        if not line or len(line) < 3:
            continue
        if re.match(
            r"^(PREFACE|CONTENTS|CONTENT|INTRODUCTION|Chapter\s*\d+)$",
            line,
            re.IGNORECASE,
        ):
            started = True
            continue
        if re.match(
            r"^(Q\.?\d+|Questions?|Answer|[A-D]\)|Sample Question|LIST OF|Printed and BoundISBN|First Edition|Twelfth|Thirteenth|Fourteenth|All rights|Sterling Book|Wg\. Cdr|Order Through|For More|Please visit|FOR UPDATES)$",
            line,
        ):
            continue

        if re.match(r"^\d+\.\d+", line):
            if current_title and current_content:
                content = re.sub(r"\s+", " ", " ".join(current_content)).strip()
                if len(content) > 30:
                    sections.append({"title": current_title, "content": content})
            current_title, current_content = line, []
            started = True
        elif (
            started
            and line
            and line[0].isupper()
            and len(line) < 55
            and not line.isdigit()
        ):
            if current_title and current_content:
                content = re.sub(r"\s+", " ", " ".join(current_content)).strip()
                if len(content) > 30:
                    sections.append({"title": current_title, "content": content})
            current_title = line
            current_content = []
        else:
            current_content.append(line)

    if current_title and current_content:
        content = re.sub(r"\s+", " ", " ".join(current_content)).strip()
        if len(content) > 30:
            sections.append({"title": current_title, "content": content})

    print(f"  {len(sections)} sections")
    return {
        "book_id": f"REG-{ch_num:03d}",
        "book_name": "Air Regulations",
        "chapter": title,
        "sections": sections,
    }


def main():
    chapters = []
    with ThreadPoolExecutor(max_workers=4) as ex:
        futures = [
            ex.submit(process_chapter, cn, t, s, e)
            for cn, (t, s, e) in CHAPTER_MAP.items()
        ]
        for f in futures:
            chapters.append(f.result())

    chapters = [c for c in chapters if c.get("sections")]
    chapters.sort(key=lambda x: int(x["book_id"].split("-")[1]))

    with open(OUTPUT_PATH, "w") as f:
        json.dump(chapters, f, indent=2)

    print(
        f"Done: {len(chapters)} chapters, {sum(len(c['sections']) for c in chapters)} sections"
    )


if __name__ == "__main__":
    main()
