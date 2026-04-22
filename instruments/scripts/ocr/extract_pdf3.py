import re
import json

with open('/Users/nancypravin/.local/share/opencode/tool-output/tool_d833af0ff001aAoEMabqC5BmW0', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.split('\n')

# Define chapters - refined boundaries
# Need to find where each chapter content actually starts and ends
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

def clean_line(line):
    # Remove page numbers and form feeds
    line = re.sub(r'\f', '', '')
    line = re.sub(r'\s+\d+\s*$', '', line)
    line = re.sub(r'^\s*\d+\s+', '', line)
    line = re.sub(r'\s+', ' ', line)
    return line.strip()

# Section detection keywords
section_keywords = [
    "Introduction", "Electromotive Force", "Current", "Resistance", 
    "Factors Affecting", "Units of Resistance", "Resistors", "Ohm's Law", 
    "Power", "Series Circuits", "Parallel Circuits", "Kirchhoff",
    "Switches", "Toggle Switch", "Switch Light", "Guarded Switch",
    "Microswitch", "Bimetallic Switch", "Thermal Switch", "Proximity Detector", 
    "Inductive", "Capacitive", "Magnetic", "Time Switch", "Centrifugal Switch",
    "Electrical Faults", "Circuit Protection", "Fuses", "Cartridge Fuse",
    "HRC Fuse", "Dummy Fuse", "Current Limiter", "Circuit Breaker",
    "Trip Free", "Reverse Current", "Capacitor", "Battery", "Lead Acid",
    "Nickel Cadmium", "Charging", "Capacity", "Magnetism", "Electromagnetism",
    "Magnetic Terms", "Electromagnet", "Generator", "Alternator", 
    "Voltage Regulator", "DC Motor", "Motor Principle",
    "Aircraft Electrical Power System", "Generating System", "Distribution",
    "Battery Charging", "Generator Control", "Reverse Current Cut-out",
    "Bonding", "Screening", "Alternating Current", "AC Generation",
    "Frequency", "Root Mean Square", "RMS", "Inductance", "Capacitive Reactance",
    "Transformer", "Transformer Principle", "AC Motor", "Induction Motor", 
    "Synchronous Motor", "Semiconductor", "Diode", "Transistor", 
    "Amplifier", "Logic Gate", "AND Gate", "OR Gate", "NOT Gate", 
    "NAND Gate", "NOR Gate", "Boolean"
]

def is_section_header(line, prev_was_blank):
    line_clean = line.strip()
    if not prev_was_blank:
        return False
    if len(line_clean) < 3 or len(line_clean) > 55:
        return False
    # Check if it matches any section keyword
    for kw in section_keywords:
        if kw.lower() in line_clean.lower():
            return True
    return False

result = []

for i, (chapter_name, start, end) in enumerate(chapters_config):
    chapter_lines = lines[start-1:end]
    
    # Clean lines
    cleaned = [clean_line(l) for l in chapter_lines]
    
    # Build sections more intelligently
    sections = []
    current_title = "Overview"
    content_lines = []
    prev_blank = True
    
    for line in cleaned:
        if is_section_header(line, prev_blank):
            # Save previous section
            if content_lines:
                content = ' '.join(content_lines)
                if len(content) > 30:
                    sections.append({"title": current_title, "content": content})
            # Start new section
            current_title = line[:50]
            content_lines = []
        
        if line and not line.startswith('Figure') and not re.match(r'^\d+$', line):
            content_lines.append(line)
        
        prev_blank = (line == '')
    
    # Add final section
    if content_lines:
        content = ' '.join(content_lines)
        if len(content) > 30:
            sections.append({"title": current_title, "content": content})
    
    # Generate book_id
    chapter_num = chapter_name.split(" - ")[0].replace("Chapter ", "")
    book_id = f"ELC-{int(chapter_num):03d}"
    
    result.append({
        "book_id": book_id,
        "book_name": "Electrics and Electronics",
        "chapter": chapter_name,
        "sections": sections
    })

# Write to JSON
with open('/Users/nancypravin/kact/dailylogs/instruments/electrics-and-electronics.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print(f"Created JSON with {len(result)} chapters and {sum(len(c['sections']) for c in result)} sections")
