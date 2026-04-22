#!/usr/bin/env python3
import json
import subprocess
from pathlib import Path

WORK_DIR = "/Users/nancypravin/kact/dailylogs/instruments"
OUTPUT_JSON = "/Users/nancypravin/kact/dailylogs/instruments/air-regulations.json"

images = sorted(Path(WORK_DIR).glob("page-*.png"))
print(f"Processing {len(images)} images...")

pages_data = []
for i, img in enumerate(images):
    if (i + 1) % 50 == 0:
        print(f"Page {i + 1}/{len(images)}...")
    result = subprocess.run(
        ["tesseract", str(img), "-"], capture_output=True, text=True
    )
    pages_data.append({"page": i + 1, "text": result.stdout})

print("Done OCR!")

# Full text - everything
full_text = "\n\n".join([p["text"] for p in pages_data])

# Also save chapters based on the book's ACTUAL content
# The book has different chapter order than expected from TOC
# Chapter 9 is actually about National Law (based on content preview)
# Chapter 10 is Personnel Licensing
# etc.

# Let's create chapters using the actual content we found
# Based on content analysis:
# - Chapter 9 (p203-216 in our JSON) actually contains "National Law"
# - Chapter 10 contains "Personnel Licensing"
# etc.

# Better approach: Keep all pages, full text
chapters = []
for i, p in enumerate(pages_data):
    chapters.append({"chapter_number": i + 1, "page": i + 1, "content": p["text"]})

result = {
    "metadata": {
        "source": "/Users/nancypravin/Downloads/Regs_ROA_DGCA.pdf",
        "total_pages": 348,
        "edition": "Thirteenth Revised Edition 2020",
    },
    "full_text": full_text,
    "pages": pages_data,
}

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print(f"Saved! Full text: {len(full_text)} chars")
