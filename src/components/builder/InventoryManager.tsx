import React from 'react';

// Definiere die Props für den InventoryManager
interface InventoryManagerProps {
  inventory: string[];
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
}

export default function InventoryManager({
  inventory,
  onAdd,
  onRemove,
}: InventoryManagerProps) {
  const handleAddItem = () => {
    const item = prompt("Enter the inventory item:");
    if (item) {
      onAdd(item);
    }
  };

  return (
    <div>
      <h2>Inventory Manager</h2>
      <button onClick={handleAddItem}>Add Item</button>
      <ul>
        {inventory.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <button onClick={() => onRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
