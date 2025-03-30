// src/utils/spellcasting.ts

const spellcastingClasses: Record<string, number | null> = {
    Wizard: 1,
    Sorcerer: 1,
    Cleric: 1,
    Druid: 1,
    Bard: 1,
    Warlock: 1,
    Paladin: 2,
    Ranger: 2,
    Artificer: 1,
    // Non-casters
    Fighter: null,
    Barbarian: null,
    Rogue: null,
    Monk: null,
  };
  
  export function hasSpellcasting(className: string, level: number): boolean {
    const requiredLevel = spellcastingClasses[className];
    return requiredLevel !== null && level >= requiredLevel;
  }
  