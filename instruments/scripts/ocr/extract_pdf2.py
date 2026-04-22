import re
import json

# Read the extracted text
with open('/Users/nancypravin/.local/share/opencode/tool-output/tool_d833af0ff001aAoEMabqC5BmW0', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.split('\n')

# Define chapters with correct line ranges based on content analysis
# Each chapter starts where the previous ends
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

def extract_sections(chapter_lines):
    sections = []
    current_title = "Introduction"
    current_content = []
    
    # Major topics to use as section headers
    major_topics = [
        "Introduction", "Electromotive Force", "Current", "Resistance", 
        "Factors Affecting", "Units of Resistance", "Resistors", "Ohm's Law", 
        "Power", "Series and Parallel Circuits", "Kirchoff's Laws",
        "Switches", "Toggle Switch", "Switch Light", "Guarded Switches",
        "Microswitch", "Bimetallic Switch", "Proximity Detectors", "Inductive Type",
        "Capacitive Type", "Magnetic Type", "Time Switches", "Centrifugal Switches",
        "Electrical Faults", "Circuit Protection Devices", "Fuses", "Cartridge Fuse",
        "High Rupture Capacity", "Dummy Fuses", "Current Limiters", "Circuit Breakers",
        "Trip Free Circuit Breakers", "Reverse Current Circuit Breakers", "Capacitors",
        "Battery", "Lead Acid", "Nickel Cadmium", "Charging", "Capacity",
        "Magnetism", "Electromagnetism", "Magnetic Terms", "Electromagnets",
        "Generator", "Alternator", "Voltage Regulator", "DC Motors", "Motor Principles",
        "Aircraft Electrical Power Systems", "Generating Systems", "Distribution",
        "Battery Charging", "Generator Control", "Reverse Current Cut-out",
        "Bonding", "Screening", "Alternating Current", "AC Generation",
        "Frequency", "Root Mean Square", "Inductance", "Capacitance",
        "Transformers", "Transformer Principles", "Transformer Types",
        "AC Motors", "Induction Motors", "Synchronous Motors",
        "Semiconductors", "Diodes", "Transistors", "Amplifiers",
        "Logic Gates", "AND Gate", "OR Gate", "NOT Gate", "NAND Gate", "NOR Gate"
    ]
    
    content_buffer = ""
    
    for line in chapter_lines:
        line = line.strip()
        
        # Skip empty lines, page numbers, figure references
        if not line or re.match(r'^\d+$', line) or line.startswith('Figure'):
            continue
            
        # Check if line is a major topic header
        is_header = False
        for topic in major_topics:
            if topic.lower() in line.lower() and len(line) < 60:
                is_header = True
                break
        
        if is_header and len(content_buffer) > 50:
            sections.append({"title": current_title, "content": content_buffer.strip()})
            # Try to extract cleaner title
            current_title = line[:50]
            content_buffer = ""
        else:
            content_buffer += " " + line
    
    # Add last section
    if content_buffer.strip():
        sections.append({"title": current_title, "content": content_buffer.strip()})
    
    return sections

result = []

for i, (chapter_name, start, end) in enumerate(chapters_config):
    chapter_lines = lines[start-1:end]
    
    # Clean the content
    cleaned_lines = []
    for line in chapter_lines:
        # Remove page numbers at end
        line = re.sub(r'\s+\d+$', '', line)
        # Remove excessive whitespace
        line = re.sub(r'\s+', ' ', line)
        if line.strip():
            cleaned_lines.append(line.strip())
    
    content = '\n'.join(cleaned_lines)
    
    # Extract sections
    sections = extract_sections(cleaned_lines)
    
    # Create book entry - fix chapter name
    chapter_num = chapter_name.split(" - ")[0].replace("Chapter ", "")
    book_id = f"ELC-{int(chapter_num):03d}"
    
    result.append({
        "book_id": book_id,
        "book_name": "Electrics and Electronics",
        "chapter": f"{chapter_name}",
        "sections": sections
    })

# Write to JSON
with open('/Users/nancypravin/kact/dailylogs/instruments/electrics-and-electronics.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print(f"Extracted {len(result)} chapters")
