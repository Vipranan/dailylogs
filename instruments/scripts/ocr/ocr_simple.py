#!/usr/bin/env python3
import json
import subprocess
from pathlib import Path

WORK_DIR = "/Users/nancypravin/kact/dailylogs/instruments"
OUTPUT_JSON = "/Users/nancypravin/kact/dailylogs/instruments/air-regulations.json"

images = sorted(Path(WORK_DIR).glob("page-*.png"))
print(f"Processing {len(images)} images...")

pages = []
for i, img in enumerate(images):
    result = subprocess.run(
        ["tesseract", str(img), "-"], capture_output=True, text=True
    )
    pages.append({"page": i + 1, "text": result.stdout})
    if (i + 1) % 50 == 0:
        print(f"Processed {i + 1}/{len(images)} pages")

print(f"Done! {len(pages)} pages")

# Save full text
full_text = "\n\n".join([p["text"] for p in pages])

result = {
    "metadata": {
        "source": "/Users/nancypravin/Downloads/Regs_ROA_DGCA.pdf",
        "total_pages": 348,
        "chapters_count": 24,
        "edition": "Thirteenth Revised Edition 2020",
    },
    "full_text": full_text,
    "pages": pages,
}

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print(f"Saved to {OUTPUT_JSON}")
print(f"Full text: {len(full_text)} chars")
