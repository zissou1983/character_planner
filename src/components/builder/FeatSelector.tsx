// src/components/builder/FeatSelector.tsx
import React from 'react';

interface FeatSelectorProps {
  feats: {
    name: string;
    category: string;
    prerequisites: string[];
    description: string;
    id: string;
    abilityScoreIncrease: Record<string, number | null> | null;
    repeatable: boolean;
    grantsSpellcasting: boolean;
  }[];
  selectedFeats: string[];
  level: number;
  knownAbilities: Record<string, number>;
  hasSpellcasting: boolean;
  onToggle: (name: string) => void;
}

export default function FeatSelector({
  feats,
  selectedFeats,
  level,
  knownAbilities,
  hasSpellcasting,
  onToggle,
}: FeatSelectorProps) {
  const validFeats = feats.filter(feat => {
    // Check if the feat is valid for the current level
    const levelIsValid = feat.prerequisites.includes(`level ${level}`);
    
    // Safely check ability score requirements
    const abilityIsValid = Object.entries(feat.abilityScoreIncrease || {}).every(
      ([key, value]) => (knownAbilities[key] || 0) >= (value || 0)
    );
    
    return levelIsValid && abilityIsValid;
  });

  return (
    <div>
      <h3>Feats</h3>
      {validFeats.map(feat => (
        <div key={feat.id}>
          <div>{feat.name}</div>
          <button onClick={() => onToggle(feat.name)}>
            {selectedFeats.includes(feat.name) ? 'Deselect' : 'Select'}
          </button>
        </div>
      ))}
    </div>
  );
}