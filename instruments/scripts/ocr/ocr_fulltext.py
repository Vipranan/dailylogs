#!/usr/bin/env python3
import json
import subprocess
from pathlib import Path

WORK_DIR = "/Users/nancypravin/kact/dailylogs/instruments"
OUTPUT_JSON = "/Users/nancypravin/kact/dailylogs/instruments/air-regulations.json"

print("Step 1: Finding existing images...")
images = sorted(Path(WORK_DIR).glob("page-*.png"))
print(f"Found {len(images)} images")

print("Step 2: OCR all pages...")
all_pages = []
for i, img in enumerate(images):
    if (i + 1) % 50 == 0:
        print(f"  {i + 1}/{len(images)}")
    result = subprocess.run(
        ["tesseract", str(img), "-"], capture_output=True, text=True, timeout=60
    )
    all_pages.append({"page": i + 1, "text": result.stdout})

print(f"Done OCR: {len(all_pages)} pages")

print("Step 3: Finding chapter boundaries from content...")

# Based on actual content analysis - these are the page numbers where chapter titles appear
chapter_markers = [
    (1, "Definitions And Abbreviations"),
    (35, "International Organisations and Conventions"),
    (61, "Aircraft Nationality and Registration Marks"),
    (67, "Rules of the Air"),
    (121, "Air Traffic Services"),
    (153, "Area Control Service"),
    (177, "Approach Control Service"),
    (187, "Procedures for Aerodrome Control Service"),
    (203, "Use of Air Traffic Services Surveillance System"),
    (217, "Aeronautical Information Services"),
    (237, "Search and Rescue"),
    (247, "Visual Aids for Navigation"),
    (307, "Procedures for Air Navigation Services - Aircraft Operations"),
    (363, "National Law"),
    (403, "Personnel Licensing"),
    (429, "Airworthiness of Aircraft"),
    (435, "Aerodromes"),
    (465, "Special Operational Procedures and Hazards"),
    (503, "Communications"),
    (535, "Aircraft Accident and Incident"),
    (545, "Facilitation"),
    (557, "Security"),
    (563, "Human Performance and Limitations"),
    (637, "Sample Question Papers"),
]

# Map actual page numbers (where chapters start in PDF) to chapter numbers
# Based on analysis: Chapter content starts at these PDF page numbers
actual_chapters = [
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
]

# For now, let's extract ALL content - full_text
all_text = "\n\n".join([p["text"] for p in all_pages])

print(f"Total extracted text: {len(all_text)} chars")

result = {
    "metadata": {
        "source": "/Users/nancypravin/Downloads/Regs_ROA_DGCA.pdf",
        "total_pages": 348,
        "chapters_count": 24,
        "edition": "Thirteenth Revised Edition 2020",
    },
    "full_text": all_text,
    "pages": all_pages,
}

print(f"Saving to {OUTPUT_JSON}...")
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print("Done!")
print(f"Full text length: {len(all_text)} chars")
