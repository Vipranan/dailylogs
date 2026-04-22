#!/usr/bin/env python3
import json
import subprocess
from pathlib import Path
import re

WORK_DIR = "/Users/nancypravin/kact/dailylogs/instruments"
OUTPUT_JSON = "/Users/nancypravin/kact/dailylogs/instruments/air-regulations.json"

images = sorted(Path(WORK_DIR).glob("page-*.png"))
print(f"OCRing {len(images)} pages (this will take a while)...")

pages_data = []
for i, img in enumerate(images):
    if (i + 1) % 50 == 0:
        print(f"Page {i + 1}/{len(images)}...")
    result = subprocess.run(
        ["tesseract", str(img), "-"], capture_output=True, text=True
    )
    pages_data.append({"page": i + 1, "text": result.stdout})

print("Done OCR! Now extracting chapters...")

# Chapter TOC with actual page ranges (based on book TOC)
chapter_ranges = [
    (1, "Definitions And Abbreviations", 1, 34),
    (2, "International Organisations and Conventions", 35, 60),
    (3, "Aircraft Nationality and Registration Marks", 61, 66),
    (4, "Rules of the Air", 67, 120),
    (5, "Air Traffic Services", 121, 152),
    (6, "Area Control Service", 153, 176),
    (7, "Approach Control Service", 177, 186),
    (8, "Procedures for Aerodrome Control Service", 187, 202),
    (9, "Use of Air Traffic Services Surveillance System", 203, 216),
    (10, "Aeronautical Information Services", 217, 236),
    (11, "Search and Rescue", 237, 246),
    (12, "Visual Aids for Navigation", 247, 306),
    (13, "Procedures for Air Navigation Services - Aircraft Operations", 307, 348),
    (14, "National Law", 349, 362),
    (15, "Personnel Licensing", 363, 402),
    (16, "Airworthiness of Aircraft", 403, 428),
    (17, "Aerodromes", 429, 464),
    (18, "Special Operational Procedures and Hazards", 465, 502),
    (19, "Communications", 503, 534),
    (20, "Aircraft Accident and Incident", 535, 544),
    (21, "Facilitation", 545, 556),
    (22, "Security", 557, 562),
    (23, "Human Performance and Limitations", 563, 636),
    (24, "Sample Question Papers", 637, 348),
]

chapters = []
for num, title, start, end in chapter_ranges:
    texts = []
    for p in range(start, min(end + 1, 349)):
        idx = p - 1
        if 0 <= idx < len(pages_data):
            texts.append(pages_data[idx]["text"])

    content = "\n\n".join(texts)
    chapters.append(
        {
            "chapter_number": num,
            "chapter_title": title,
            "start_page": start,
            "end_page": min(end, 348),
            "content": content,
        }
    )
    print(
        f"Ch {num}: {title[:40]} - pages {start}-{min(end, 348)}, {len(content)} chars"
    )

result = {
    "metadata": {
        "source": "/Users/nancypravin/Downloads/Regs_ROA_DGCA.pdf",
        "total_pages": 348,
        "chapters_count": 24,
        "edition": "Thirteenth Revised Edition 2020",
    },
    "chapters": chapters,
}

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print(f"\nDone! Saved to {OUTPUT_JSON}")
