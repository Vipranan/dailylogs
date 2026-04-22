#!/usr/bin/env python3
import pdf2image
import pytesseract
import json
import os
import re
from concurrent.futures import ThreadPoolExecutor, as_completed

PDF_PATH = "/Users/nancypravin/Downloads/Regs_ROA_DGCA.pdf"
OUTPUT_JSON = "/Users/nancypravin/kact/dailylogs/instruments/air-regulations.json"


def ocr_page(args):
    page_num, image = args
    text = pytesseract.image_to_string(image, config="--psm 6")
    return {"page": page_num, "text": text}


def ocr_pdf_optimized(pdf_path, dpi=150, batch_size=50):
    print(f"Converting PDF to images at {dpi} DPI...")
    images = pdf2image.convert_from_path(pdf_path, dpi=dpi)
    total_pages = len(images)
    print(f"Total pages: {total_pages}")

    results = []
    for i, image in enumerate(images):
        print(f"OCRing page {i + 1}/{total_pages}...", end="\r")
        text = pytesseract.image_to_string(image, config="--psm 6")
        results.append({"page": i + 1, "text": text})

    print(f"\nCompleted OCR for all {total_pages} pages")
    return results


def extract_chapters(pages_data):
    full_text = "\n\n".join([p["text"] for p in pages_data])

    chapter_pattern = (
        r"(?:CHAPTER|Chapter|CHAPTER\s+)(\d+|[IVXLCDM]+)\s*[:\.\-]?\s*([^\n]{1,100})"
    )

    chapters = []
    current_chapter = None
    current_content = []

    lines = full_text.split("\n")
    for line in lines:
        chapter_match = re.match(chapter_pattern, line.strip())
        if chapter_match:
            if current_chapter:
                chapters.append(
                    {"chapter": current_chapter, "content": "\n".join(current_content)}
                )
            current_chapter = (
                f"{chapter_match.group(1)}: {chapter_match.group(2)}".strip()
            )
            current_content = [line]
        else:
            current_content.append(line)

    if current_chapter:
        chapters.append(
            {"chapter": current_chapter, "content": "\n".join(current_content)}
        )

    return chapters, full_text


def find_all_chapters(full_text):
    chapter_keywords = [
        "The Aircraft Act",
        "DGCA CARs",
        "Airspace",
        "Aerodromes",
        "Aviation Safety",
        "Security",
        "Human Performance",
        "Meteorology",
        "Search and Rescue",
        "Radio Telephony",
        "CHAPTER",
        "Chapter",
        "SECTION",
        "Section",
    ]

    lines = full_text.split("\n")
    found_chapters = []

    for i, line in enumerate(lines):
        line_upper = line.strip().upper()
        if any(kw.upper() in line_upper for kw in chapter_keywords):
            if len(line.strip()) > 3 and len(line.strip()) < 150:
                found_chapters.append({"line": i + 1, "text": line.strip()})

    return found_chapters


print("Starting OCR process (optimized)...")
pages_data = ocr_pdf_optimized(PDF_PATH, dpi=150)

print("\nExtracting chapters...")
chapters, full_text = extract_chapters(pages_data)

print(f"\nFound {len(chapters)} chapters in structured format")

found = find_all_chapters(full_text)
print(f"Found {len(found)} chapter/section headers")

result = {
    "metadata": {
        "source": PDF_PATH,
        "total_pages": len(pages_data),
        "chapters_found": len(chapters),
        "chapter_headers_found": len(found),
    },
    "chapter_headers": found,
    "chapters": chapters,
    "full_text": full_text,
    "pages": pages_data,
}

print(f"\nSaving to {OUTPUT_JSON}...")
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print(f"Done! Saved to {OUTPUT_JSON}")
print(f"Total chapters found: {len(chapters)}")
print(f"Total chapter headers: {len(found)}")
