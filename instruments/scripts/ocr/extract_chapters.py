#!/usr/bin/env python3
import json
import re

INPUT_JSON = "/Users/nancypravin/kact/dailylogs/instruments/air-regulations.json"
OUTPUT_JSON = "/Users/nancypravin/kact/dailylogs/instruments/air-regulations.json"

with open(INPUT_JSON) as f:
    data = json.load(f)

# Chapter TOC with page ranges
toc = [
    (1, "Definitions And Abbreviations", 1),
    (2, "International Organisations and Conventions", 35),
    (3, "Aircraft Nationality and Registration Marks", 61),
    (4, "Rules of the Air", 67),
    (5, "Air Traffic Services", 121),
    (6, "Area Control Service", 153),
    (7, "Approach Control Service", 177),
    (8, "Procedures for Aerodrome Control Service", 187),
    (9, "Use of Air Traffic Services Surveillance System", 203),
    (10, "Aeronautical Information Services", 217),
    (11, "Search and Rescue", 237),
    (12, "Visual Aids for Navigation", 247),
    (13, "Procedures for Air Navigation Services - Aircraft Operations", 307),
    (14, "National Law", 363),
    (15, "Personnel Licensing", 403),
    (16, "Airworthiness of Aircraft", 429),
    (17, "Aerodromes", 435),
    (18, "Special Operational Procedures and Hazards (General Aspects)", 465),
    (19, "Communications", 503),
    (20, "Aircraft Accident and Incident", 535),
    (21, "Facilitation", 545),
    (
        22,
        "Security - Safeguarding International Civil Aviation against Acts of Unlawful Interference",
        557,
    ),
    (23, "Human Performance and Limitations", 563),
    (24, "Sample Question Papers", 637),
]


def get_page_ranges(toc, total_pages):
    """Calculate start and end pages for each chapter"""
    chapters = []
    for i, (num, title, start) in enumerate(toc):
        end = total_pages if i == len(toc) - 1 else toc[i + 1][2] - 1
        chapters.append(
            {"number": num, "title": title, "start_page": start, "end_page": end}
        )
    return chapters


total_pages = len(data["pages"])
page_ranges = get_page_ranges(toc, total_pages)

print(f"Total pages in PDF: {total_pages}")
print(f"Chapters to extract: {len(page_ranges)}")

extracted_chapters = []
for ch in page_ranges:
    start_idx = ch["start_page"] - 1
    end_idx = ch["end_page"]

    chapter_texts = []
    for page_idx in range(start_idx, min(end_idx, total_pages)):
        if page_idx < len(data["pages"]):
            chapter_texts.append(data["pages"][page_idx]["text"])

    content = "\n\n".join(chapter_texts)

    extracted_chapters.append(
        {
            "chapter_number": ch["number"],
            "chapter_title": ch["title"],
            "start_page": ch["start_page"],
            "end_page": ch["end_page"],
            "content": content,
        }
    )

    print(
        f"Extracted Chapter {ch['number']}: {ch['title']} (pages {ch['start_page']}-{ch['end_page']}, {len(content)} chars)"
    )

result = {
    "metadata": {
        "source": "/Users/nancypravin/Downloads/Regs_ROA_DGCA.pdf",
        "total_pages": total_pages,
        "chapters_count": len(extracted_chapters),
        "edition": "Thirteenth Revised Edition 2020",
        "author": "Wg. Cdr. R.K. Bali (Retd.)",
    },
    "chapters": extracted_chapters,
}

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print(f"\n✓ Saved complete extraction to {OUTPUT_JSON}")
print(f"Total chapters: {len(extracted_chapters)}")
