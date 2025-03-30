
// TypeScript Interfaces für D&D One Charakterplaner

export type Ability = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export interface AbilityScores {
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  WIS: number;
  CHA: number;
}

export type EquipmentSlot =
  | 'mainHand'
  | 'offHand'
  | 'armor'
  | 'helmet'
  | 'gloves'
  | 'boots'
  | 'ring1'
  | 'ring2'
  | 'amulet'
  | 'cloak'
  | 'belt'
  | 'misc';

export interface EquipmentItem {
  id: string; // z. B. "longsword" oder UUID
  name: string;
  slot: EquipmentSlot;
  type: 'weapon' | 'armor' | 'gear' | 'magic' | 'misc';
  bonus?: Partial<Record<Ability, number>>;
  acBonus?: number;
  description?: string;
}

export interface CharacterEquipment {
  [slot in EquipmentSlot]?: EquipmentItem;
}

export interface Character {
  id: string; // UUID oder eindeutiger Bezeichner
  name: string;
  species: string;
  lineage?: string;
  class: string;
  subclass?: string;
  level: number;
  background: string;
  abilities: AbilityScores;
  proficiencies: string[];
  features: string[];
  feats: string[];
  spells: string[];
  equipment: CharacterEquipment;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Beispiel: Ein Zauber könnte später wie folgt aussehen
export interface Spell {
  id: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  duration: string;
  range: string;
  components: string[];
  description: string;
  classList: string[]; // Welche Klassen diesen Zauber nutzen können
}

// ToDo: Interfaces für Species, Class, Subclass, Background, Feat etc.
// Diese können jeweils z. B. passives Wissen (Sprachen, Proficiencies), Attributsboni usw. enthalten.
