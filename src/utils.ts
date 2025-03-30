// src/utils.ts

export function convertAbilitiesToRecord(abilities: { id: string; name: string; description: string }[]) {
  return Object.fromEntries(
    abilities.map((a) => [a.id, { name: a.name, description: a.description }])
  );
}

export function convertLanguagesToArray(languages: { name: string }[]) {
  return languages.map((l) => l.name);
}

export function convertFeats(feats: {
  id: string;
  name: string;
  description: string;
  category: string;
  prerequisites: string[];
}[]) {
  return feats.map((feat) => ({
    ...feat,
    prerequisites: {
      ability: feat.prerequisites.find((p) =>
        ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"].some((a) => p.includes(a))
      ),
      spellcasting: feat.prerequisites.includes("Spellcasting"),
    },
  }));
}
