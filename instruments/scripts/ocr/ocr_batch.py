#!/usr/bin/env python3
import json
import os
import re
import subprocess
from pathlib import Path

PDF_PATH = "/Users/nancypravin/Downloads/Regs_ROA_DGCA.pdf"
OUTPUT_JSON = "/Users/nancypravin/kact/dailylogs/instruments/air-regulations.json"
WORK_DIR = "/Users/nancypravin/kact/dailylogs/instruments"

print("Step 1: Convert PDF to images with pdftoppm...")
cmd = ["pdftoppm", "-r", "150", "-png", PDF_PATH, "page"]
result = subprocess.run(cmd, capture_output=True, text=True, cwd=WORK_DIR)
print(result.stdout)

image_files = sorted(Path(WORK_DIR).glob("page-*.png"))
print(f"Generated {len(image_files)} images")

print("\nStep 2: OCR images in batches...")
all_text = []
for i, img in enumerate(image_files):
    print(f"OCRing {img.name} ({i + 1}/{len(image_files)})...", end="\r")
    result = subprocess.run(
        ["tesseract", str(img), "-"], capture_output=True, text=True
    )
    all_text.append({"page": i + 1, "text": result.stdout})
print(f"\nCompleted {len(all_text)} pages")

print("\nStep 3: Extract and organize content...")


def find_all_chapters(text):
    chapter_pattern = (
        r"(?:CHAPTER|Chapter|CH\b)\s*(\d+|[IVXLCDM]+)\s*[:\.\-]?\s*([^\n]{3,120})"
    )
    matches = []
    for line in text.split("\n"):
        m = re.match(chapter_pattern, line.strip())
        if m:
            matches.append({"chapter": f"{m.group(1)}: {m.group(2)}".strip()})
    return matches


full_text = "\n\n".join([p["text"] for p in all_text])
chapters = find_all_chapters(full_text)

print(f"\nFound {len(chapters)} chapters:")
for ch in chapters:
    print(f"  - {ch['chapter']}")

result = {
    "metadata": {
        "source": PDF_PATH,
        "total_pages": len(all_text),
        "chapters_found": len(chapters),
    },
    "chapters": chapters,
    "full_text": full_text,
    "pages": all_text,
}

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print(f"\nSaved to {OUTPUT_JSON}")
print(f"Total chapters: {len(chapters)}")
