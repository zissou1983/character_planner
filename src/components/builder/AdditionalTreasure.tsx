import React from 'react';

// Definiere die Props für den AdditionalTreasure-Selektor
interface AdditionalTreasureProps {
  treasure: string[];
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
}

export default function AdditionalTreasure({
  treasure,
  onAdd,
  onRemove,
}: AdditionalTreasureProps) {
  const handleAddItem = () => {
    const item = prompt("Enter the treasure item:");
    if (item) {
      onAdd(item);
    }
  };

  return (
    <div>
      <h2>Additional Treasure</h2>
      <button onClick={handleAddItem}>Add Treasure</button>
      <ul>
        {treasure.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <button onClick={() => onRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
