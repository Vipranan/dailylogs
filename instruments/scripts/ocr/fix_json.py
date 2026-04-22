import json

with open('/Users/nancypravin/kact/dailylogs/instruments/electrics-and-electronics.json', 'r') as f:
    data = json.load(f)

# Fix book_id to be sequential (1-16) instead of chapter-based
# DC Electrics chapters 1-9 -> 001-009
# AC Electrics chapters 11-17 -> 010-016 (skip 10 as it's Specimen Questions)

for i, chapter in enumerate(data):
    new_id = f"ELC-{i+1:03d}"
    chapter['book_id'] = new_id

with open('/Users/nancypravin/kact/dailylogs/instruments/electrics-and-electronics.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Fixed book_id numbering")
