import React from 'react';
import { AbilityDetail } from '@/types/character'; // Importiere den Typ

interface AbilitySelectorProps {
  abilities: Record<string, AbilityDetail>;
  onChange: (ability: string, newValue: number) => void;
}

export default function AbilitySelector({ abilities, onChange }: AbilitySelectorProps) {
  return (
    <div>
      <h3>Abilities</h3>
      {Object.entries(abilities).map(([key, { base, bonus, total, modifier }]) => (
        <div key={key}>
          <div>{key}: {base}, {bonus}, {total}, {modifier}</div>
          {/* Render Controls to change abilities */}
        </div>
      ))}
    </div>
  );
}
