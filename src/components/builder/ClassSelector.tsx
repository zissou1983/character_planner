import React from 'react';

interface ClassSelectorProps {
  classes: { id: string; name: string; hitDie: string; subclasses: string[]; spellcasting: boolean }[];
  selected: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

export default function ClassSelector({
  classes,
  selected,
  onSelect,
}: ClassSelectorProps) {
  return (
    <div>
      <h2>Select a Class</h2>
      <select value={selected} onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select a Class</option>
        {classes.map((cls) => (
          <option key={cls.id} value={cls.id}>
            {cls.name}
          </option>
        ))}
      </select>
    </div>
  );
}
