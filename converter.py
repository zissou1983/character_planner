import pandas as pd
import json

# === Hilfsfunktionen ===

def parse_weight(w):
    if pd.isna(w):
        return 0
    w = str(w).lower().replace("lb.", "").replace("lbs.", "").strip()
    try:
        if " " in w:
            whole, frac = w.split(" ")
            return float(whole) + eval(frac)
        return float(eval(w))
    except:
        return 0

def parse_cost(value):
    try:
        return float(str(value).replace(",", ".").replace(" GP", "").strip())
    except:
        return 0

def get_availability(row):
    shop_cols = row.index[8:]  # alles nach 'Source'
    return [col for col in shop_cols if str(row[col]).strip().lower() == 'x']

def format_source(source):
    s = str(source).upper().strip()
    if 'PHB' in s:
        return 'PHB 2024'
    elif 'DMG' in s:
        return 'DMG 2024'
    return s

# === Datei laden ===

df = pd.read_excel("allitems.xlsx", engine="openpyxl")

items = []

for index, row in df.iterrows():
    item = {
        "id": f"AG{index + 1:03}",
        "category": row.get("Category", "Common"),
        "subCategory": row.get("Sub-Category") or "",
        "name": row.get("Item"),
        "weight": parse_weight(row.get("Weight")),
        "cost": parse_cost(row.get("Cost")),
        "cheap": parse_cost(row.get("Cheap")),
        "expensive": parse_cost(row.get("Expensive")),
        "source": format_source(row.get("Source")),
        "availableIn": get_availability(row)
    }
    items.append(item)

# === JSON speichern ===

with open("equipment.json", "w", encoding="utf-8") as f:
    json.dump(items, f, indent=2, ensure_ascii=False)

print(f"{len(items)} Items erfolgreich konvertiert und gespeichert.")
