import React from 'react';

// Definieren der Typen für die Props
interface CharacterDetailsProps {
  name: string;
  gender: string;
  alignment: string;
  inspiration: boolean;
  languages: string[];
  knownLanguages: string[];
  onDetailChange: (field: string, value: string | boolean) => void;
  onToggleLanguage: (lang: string) => void;
  onChange: () => void;
}

// Die Funktionale Komponente für CharacterDetails
export default function CharacterDetails({
  name,
  gender,
  alignment,
  inspiration,
  languages,
  knownLanguages,
  onDetailChange,
  onToggleLanguage,
  onChange,
}: CharacterDetailsProps) {
  return (
    <div>
      <h2>Character Details</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => onDetailChange('name', e.target.value)}
        />
      </div>
      <div>
        <label>Gender:</label>
        <input
          type="text"
          value={gender}
          onChange={(e) => onDetailChange('gender', e.target.value)}
        />
      </div>
      <div>
        <label>Alignment:</label>
        <input
          type="text"
          value={alignment}
          onChange={(e) => onDetailChange('alignment', e.target.value)}
        />
      </div>
      <div>
        <label>Inspiration:</label>
        <input
          type="checkbox"
          checked={inspiration}
          onChange={(e) => onDetailChange('inspiration', e.target.checked)}
        />
      </div>
      <div>
        <label>Languages:</label>
        <div>
          {languages.map((lang, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={knownLanguages.includes(lang)}
                  onChange={() => onToggleLanguage(lang)}
                />
                {lang}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
