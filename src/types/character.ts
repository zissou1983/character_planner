// src/types/character.ts

// Basisfähigkeiten für D&D One
export type Ability = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

// Struktur für detaillierte Werte je Fähigkeit (z. B. für Point Buy)
export interface AbilityDetail {
  base: number;
  bonus: number;
  total: number;
  modifier: number;
}

// Map für alle Ability-Details
export type AbilityMap = Record<Ability, AbilityDetail>;

// Vereinfachte Darstellung nur mit Zahlenwerten
export type AbilityScores = Record<Ability, number>;

// Ausrüstungsplätze
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

// Einzelnes Ausrüstungsteil
export interface EquipmentItem {
  id: string; // z. B. "longsword" oder UUID
  name: string;
  slot: EquipmentSlot;
  type: 'weapon' | 'armor' | 'gear' | 'magic' | 'misc';
  bonus?: Partial<Record<Ability, number>>;
  acBonus?: number;
  description?: string;
}

// Ausrüstung je Slot
export type CharacterEquipment = {
  [slot in EquipmentSlot]?: EquipmentItem;
};

// Hauptcharakter-Interface
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

// Zauberdefinition
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

// Feat (Talent) - wird in FeatSelector verwendet
export interface Feat {
  id: string;
  name: string;
  description: string;
  prerequisites: string[];
  effects: string[];
}

// ToDo: Weitere Interfaces für Species, Class, Background, Feat usw.
