#!/usr/bin/env python3
import json
import subprocess
from pathlib import Path

PDF_PATH = "/Users/nancypravin/Downloads/Regs_ROA_DGCA.pdf"
WORK_DIR = "/Users/nancypravin/kact/dailylogs/instruments"
OUTPUT_JSON = "/Users/nancypravin/kact/dailylogs/instruments/air-regulations.json"

print("Step 1: Convert PDF to images...")
cmd = ["pdftoppm", "-r", "150", "-png", PDF_PATH, "page"]
result = subprocess.run(cmd, capture_output=True, text=True, cwd=WORK_DIR)

image_files = sorted(Path(WORK_DIR).glob("page-*.png"))
print(f"Generated {len(image_files)} images")

print("\nStep 2: OCR all images...")
all_pages = []
for i, img in enumerate(image_files):
    if i % 50 == 0:
        print(f"OCRing page {i + 1}/{len(image_files)}...")
    result = subprocess.run(
        ["tesseract", str(img), "-"], capture_output=True, text=True
    )
    all_pages.append({"page": i + 1, "text": result.stdout})

print(f"Completed {len(all_pages)} pages")

# TOC with page numbers
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

print("\nStep 3: Extract chapters...")
total_pages = len(all_pages)
extracted_chapters = []

for i, (num, title, start) in enumerate(toc):
    end = total_pages if i == len(toc) - 1 else toc[i + 1][2] - 1

    chapter_texts = []
    for page_num in range(start, end + 1):
        page_idx = page_num - 1
        if 0 <= page_idx < total_pages:
            chapter_texts.append(all_pages[page_idx]["text"])

    content = "\n\n".join(chapter_texts)

    extracted_chapters.append(
        {
            "chapter_number": num,
            "chapter_title": title,
            "start_page": start,
            "end_page": end,
            "content": content,
        }
    )

    print(f"Chapter {num}: {title} (pages {start}-{end}, {len(content)} chars)")

result = {
    "metadata": {
        "source": PDF_PATH,
        "total_pages": total_pages,
        "chapters_count": len(extracted_chapters),
        "edition": "Thirteenth Revised Edition 2020",
    },
    "chapters": extracted_chapters,
}

print(f"\nSaving to {OUTPUT_JSON}...")
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print("Done!")
