import React from 'react';

interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  cost: string;
}

interface EquipmentSelectorProps {
  options: EquipmentItem[];
  selected: string[];
  onToggle: (name: string) => void;
}

export default function EquipmentSelector({
  options,
  selected,
  onToggle,
}: EquipmentSelectorProps) {
  return (
    <div>
      <h2>Select Equipment</h2>
      <div>
        {options.map((item) => (
          <div key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(item.id)}
                onChange={() => onToggle(item.id)}
              />
              {item.name} ({item.cost})
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
