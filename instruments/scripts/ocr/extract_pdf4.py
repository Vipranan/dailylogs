import re
import json

with open('/Users/nancypravin/.local/share/opencode/tool-output/tool_d833af0ff001aAoEMabqC5BmW0', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.split('\n')

# Refined chapter boundaries based on content analysis
chapters_config = [
    ("Chapter 1 - Basic Principles", 240, 754),
    ("Chapter 2 - Switches", 1398, 1597),
    ("Chapter 3 - Circuit Protection and Capacitors", 1651, 2048),
    ("Chapter 4 - Batteries", 2321, 3050),
    ("Chapter 5 - Magnetism", 3050, 3519),
    ("Chapter 6 - Generators and Alternators", 3519, 4536),
    ("Chapter 7 - DC Motors", 4536, 5233),
    ("Chapter 8 - Aircraft Electrical Power Systems", 5233, 6298),
    ("Chapter 9 - Bonding and Screening", 6298, 6809),
    ("Chapter 11 - Introduction to AC", 6809, 8096),
    ("Chapter 12 - Alternators", 8096, 9829),
    ("Chapter 13 - Practical Aircraft Systems", 9829, 10105),
    ("Chapter 14 - Transformers", 10105, 10492),
    ("Chapter 15 - AC Motors", 10492, 10837),
    ("Chapter 16 - Semiconductors", 10837, 11245),
    ("Chapter 17 - Logic Gates", 11245, 11496)
]

def clean_content(lines):
    content_parts = []
    for line in lines:
        # Remove form feeds and page numbers
        line = re.sub(r'\f', '', line)
        line = re.sub(r'\s+\d+\s*$', '', line)
        line = re.sub(r'^\s*\d+\s+DC', 'DC', line)
        line = re.sub(r'^DC Electrics.*', '', line)
        line = re.sub(r'^AC Electrics.*', '', line)
        line = line.strip()
        # Skip empty lines, figure references, and pure numbers
        if line and not line.startswith('Figure') and not re.match(r'^\d+$', line):
            content_parts.append(line)
    return ' '.join(content_parts)

# Major section headers to identify
major_sections = [
    ("Introduction", "EMF"),
    ("Electromotive Force", "Current"),
    ("Current", "Resistance"),
    ("Resistance", "Factors"),
    ("Factors Affecting", "Units"),
    ("Units of Resistance", "Resistors"),
    ("Resistors", "Ohm"),
    ("Ohm's Law", "Power"),
    ("Power", "Series"),
    ("Series and Parallel", "Kirchhoff"),
    ("Kirchhoff", "Switches"),
    ("Switches", "Toggle"),
    ("Toggle Switch", "Switch Light"),
    ("Switch Light", "Guarded"),
    ("Guarded Switches", "Microswitch"),
    ("Microswitch", "Bimetallic"),
    ("Bimetallic Switch", "Proximity"),
    ("Proximity Detectors", "Inductive"),
    ("Inductive Type", "Capacitive"),
    ("Capacitive Type", "Magnetic"),
    ("Magnetic Type", "Time"),
    ("Time Switches", "Centrifugal"),
    ("Centrifugal Switches", "Faults"),
    ("Electrical Faults", "Circuit Protection"),
    ("Circuit Protection Devices", "Fuses"),
    ("Fuses", "Cartridge"),
    ("Cartridge Fuse", "HRC"),
    ("HRC Fuses", "Dummy"),
    ("Dummy Fuses", "Current Limiters"),
    ("Current Limiters", "Circuit Breakers"),
    ("Circuit Breakers", "Trip Free"),
    ("Trip Free", "Reverse Current"),
    ("Reverse Current", "Capacitors"),
    ("Capacitors", "Questions"),
    ("Battery", "Lead"),
    ("Lead Acid Battery", "Nickel"),
    ("Nickel Cadmium", "Charging"),
    ("Charging", "Capacity"),
    ("Capacity", "Magnetism"),
    ("Magnetism", "Electromagnetism"),
    ("Electromagnetism", "Magnetic Terms"),
    ("Magnetic Terms", "Electromagnets"),
    ("Electromagnets", "Generator"),
    ("Generator", "Alternator"),
    ("Alternator", "Voltage Regulator"),
    ("Voltage Regulator", "DC Motors"),
    ("DC Motors", "Motor Principle"),
    ("Motor Principles", "Generating"),
    ("Generating Systems", "Distribution"),
    ("Distribution", "Battery Charging"),
    ("Battery Charging", "Generator Control"),
    ("Generator Control", "Reverse Current Cut-out"),
    ("Reverse Current Cut-out", "Bonding"),
    ("Bonding", "Screening"),
    ("Screening", "Alternating Current"),
    ("Alternating Current", "AC Generation"),
    ("AC Generation", "Frequency"),
    ("Frequency", "RMS"),
    ("RMS", "Inductance"),
    ("Inductance", "Capacitance"),
    ("Capacitance", "Transformers"),
    ("Transformers", "Transformer Principles"),
    ("Transformer Principles", "AC Motors"),
    ("AC Motors", "Induction"),
    ("Induction Motors", "Synchronous"),
    ("Synchronous Motors", "Semiconductors"),
    ("Semiconductors", "Diodes"),
    ("Diodes", "Transistors"),
    ("Transistors", "Amplifiers"),
    ("Amplifiers", "Logic Gates"),
    ("Logic Gates", "Index")
]

def extract_sections_v2(content):
    sections = []
    # Split by common major topics in the content
    # Use patterns like "Topic\n\nMore content"
    
    # Simple approach: look for the major headers in the content
    content_lower = content.lower()
    
    # Try to find each major section
    for start_kw, end_kw in major_sections:
        start_idx = content_lower.find(start_kw.lower())
        if start_idx == -1:
            continue
        # Find end
        if end_kw.lower() == 'index':
            end_idx = len(content)
        else:
            end_idx = content_lower.find(end_kw.lower(), start_idx + len(start_kw))
        
        if end_idx == -1:
            end_idx = len(content)
        
        section_content = content[start_idx:end_idx].strip()
        if len(section_content) > 50:
            sections.append({"title": start_kw, "content": section_content[:8000]})
    
    if not sections:
        # Fallback: just split into paragraphs
        paragraphs = content.split('. ')
        for i, p in enumerate(paragraphs[:20]):
            if len(p) > 50:
                sections.append({"title": f"Part {i+1}", "content": p[:500]})
    
    return sections

result = []

for i, (chapter_name, start, end) in enumerate(chapters_config):
    chapter_lines = lines[start-1:end]
    raw_content = '\n'.join(chapter_lines)
    
    # Clean the content
    content = clean_content(chapter_lines)
    
    # Get chapter number for book_id
    chapter_num = chapter_name.split(" - ")[0].replace("Chapter ", "")
    book_id = f"ELC-{int(chapter_num):03d}"
    
    # Extract sections - simplified approach
    # Just use the whole content as one section or split intelligently
    sections = []
    
    # Create a single comprehensive section for now
    if len(content) > 100:
        sections.append({
            "title": "Full Chapter Content",
            "content": content[:15000]  # Limit content size
        })
    
    # Also try to add subsections based on key headers found
    subsection_headers = [
        "Introduction", "Electromotive Force", "Current", "Resistance",
        "Ohm's Law", "Power", "Kirchhoff", "Switches", "Toggle", "Switch Light",
        "Capacitors", "Battery", "Magnetism", "Electromagnetism", 
        "Generator", "Alternator", "DC Motors", "Bonding", "Screening",
        "Alternating Current", "Frequency", "Inductance", "Capacitance",
        "Transformer", "AC Motors", "Semiconductors", "Logic Gates"
    ]
    
    for header in subsection_headers:
        header_idx = content.lower().find(header.lower())
        if header_idx > 0 and header_idx < len(content) - 100:
            # Extract ~500 chars after this header
            section_content = content[header_idx:header_idx+500]
            if len(section_content) > 50:
                sections.append({
                    "title": header,
                    "content": section_content
                })
    
    # Deduplicate by title
    seen_titles = set()
    unique_sections = []
    for s in sections:
        if s['title'] not in seen_titles:
            seen_titles.add(s['title'])
            unique_sections.append(s)
    
    result.append({
        "book_id": book_id,
        "book_name": "Electrics and Electronics",
        "chapter": chapter_name,
        "sections": unique_sections if unique_sections else [{"title": "Content", "content": content[:5000]}]
    })

# Write to JSON
with open('/Users/nancypravin/kact/dailylogs/instruments/electrics-and-electronics.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print(f"Created JSON with {len(result)} chapters")
for r in result:
    print(f"  {r['chapter']}: {len(r['sections'])} sections")
