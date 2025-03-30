import React from 'react';

// Definiere die Props für den SummaryTab
interface SummaryTabProps {
  name: string;
  gender: string;
  alignment: string;
  species: string;
  characterClass: string;
  background: string;
  abilities: Record<string, { base: number; bonus: number; total: number; modifier: number }>;
  feats: string[];
  equipment: string[];
  languages: string[];
  inventory: string[];
}

export default function SummaryTab({
  name,
  gender,
  alignment,
  species,
  characterClass,
  background,
  abilities,
  feats,
  equipment,
  languages,
  inventory,
}: SummaryTabProps) {
  return (
    <div>
      <h2>Summary</h2>
      <div>
        <strong>Name:</strong> {name}
      </div>
      <div>
        <strong>Gender:</strong> {gender}
      </div>
      <div>
        <strong>Alignment:</strong> {alignment}
      </div>
      <div>
        <strong>Species:</strong> {species}
      </div>
      <div>
        <strong>Class:</strong> {characterClass}
      </div>
      <div>
        <strong>Background:</strong> {background}
      </div>
      <div>
        <h3>Abilities:</h3>
        <ul>
          {Object.entries(abilities).map(([key, { base, bonus, total, modifier }]) => (
            <li key={key}>
              {key}: Base {base}, Bonus {bonus}, Total {total}, Modifier {modifier}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Feats:</h3>
        <ul>
          {feats.map((feat, index) => (
            <li key={index}>{feat}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Equipment:</h3>
        <ul>
          {equipment.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Languages:</h3>
        <ul>
          {languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Inventory:</h3>
        <ul>
          {inventory.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
