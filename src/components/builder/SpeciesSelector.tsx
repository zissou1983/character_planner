import React from 'react';

interface SpeciesSelectorProps {
  speciesList: { id: string; name: string; description: string; lineages: { id: string; name: string; description: string }[] }[];
  selected: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

export default function SpeciesSelector({
  speciesList,
  selected,
  onSelect,
}: SpeciesSelectorProps) {
  return (
    <div>
      <h2>Select a Species</h2>
      <select value={selected} onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select a Species</option>
        {speciesList.map((species) => (
          <option key={species.id} value={species.id}>
            {species.name}
          </option>
        ))}
      </select>
    </div>
  );
}
