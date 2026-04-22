import re
import json

# Read the extracted text
with open('/Users/nancypravin/.local/share/opencode/tool-output/tool_d833af0ff001aAoEMabqC5BmW0', 'r', encoding='utf-8') as f:
    text = f.read()

# Chapter boundaries based on analysis
chapters = [
    ("Chapter 1 - Basic Principles", 240, 754),
    ("Chapter 2 - Switches", 1406, 1597),
    ("Chapter 3 - Circuit Protection and Capacitors", 1659, 2048),
    ("Chapter 4 - Batteries", 2321, 3050),
    ("Chapter 5 - Magnetism", 3117, 3519),
    ("Chapter 6 - Generators and Alternators", 3596, 4536),
    ("Chapter 7 - DC Motors", 4619, 5233),
    ("Chapter 8 - Aircraft Electrical Power Systems", 5288, 6298),
    ("Chapter 9 - Bonding and Screening", 6398, 6809),
    ("Chapter 11 - Introduction to AC", 6856, 8096),
    ("Chapter 12 - Alternators", 8172, 9829),
    ("Chapter 13 - Practical Aircraft Systems", 9907, 10105),
    ("Chapter 14 - Transformers", 10183, 10492),
    ("Chapter 15 - AC Motors", 10562, 10837),
    ("Chapter 16 - Semiconductors", 10918, 11245),
    ("Chapter 17 - Logic Gates", 11325, 11496)
]

def extract_lines(start_line, end_line):
    lines = text.split('\n')
    return '\n'.join(lines[start_line-1:end_line])

def identify_sections(content):
    sections = []
    lines = content.split('\n')
    current_title = "Introduction"
    current_content = []
    
    # Look for section headers like "Introduction", "Electromotive Force (EMF)", etc.
    section_patterns = [
        r'^[A-Z][A-Za-z\s\(\)]+$',  # Single line titles
        r'^[A-Z][A-Za-z\s]+$',
    ]
    
    for line in lines:
        line = line.strip()
        # Skip empty lines and page markers
        if not line or line.startswith('Figure') or line.startswith('1 ') or line.startswith('2 '):
            continue
        # Look for potential section headers (capitalized words, not too long)
        if re.match(r'^[A-Z][A-Za-z\s\(\)\-\.]+$', line) and 3 < len(line) < 60:
            if current_content:
                sections.append({"title": current_title, "content": ' '.join(current_content)})
            current_title = line
            current_content = []
        else:
            current_content.append(line)
    
    if current_content:
        sections.append({"title": current_title, "content": ' '.join(current_content)})
    
    return sections

# This is getting complex - let me take a simpler approach
# Just extract the main content between chapter headers

result = []

for i, (chapter_name, start, end) in enumerate(chapters):
    lines = text.split('\n')[start-1:end]
    content = '\n'.join(lines)
    
    # Clean up content
    content = re.sub(r'\d+$', '', content)  # Remove trailing page numbers
    content = re.sub(r'^\d+\s+', '', content, flags=re.MULTILINE)
    content = re.sub(r'\n\s*\n', '\n', content)
    
    # Extract sections by looking for major headings
    sections = []
    
    # Split by common section patterns
    parts = re.split(r'(?=\n[A-Z][a-zA-Z\s]+\n)', content)
    
    for part in parts:
        part = part.strip()
        if len(part) > 50:
            # Try to extract title from first line
            lines_in_part = part.split('\n')
            title = lines_in_part[0].strip() if lines_in_part else "Section"
            body = '\n'.join(lines_in_part[1:]) if len(lines_in_part) > 1 else part
            sections.append({"title": title, "content": body})
    
    if not sections:
        sections = [{"title": "Content", "content": content[:5000]}]
    
    # Create book entry
    book_id = f"ELC-{i+1:03d}"
    result.append({
        "book_id": book_id,
        "book_name": "Electrics and Electronics",
        "chapter": f"Chapter {chapter_name}",
        "sections": sections
    })

# Write to JSON
with open('/Users/nancypravin/kact/dailylogs/instruments/electrics-and-electronics.json', 'w') as f:
    json.dump(result, f, indent=2)

print("Extraction complete!")
