// src/types/character.ts

// Basisfähigkeiten für D&D One
export type Ability = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

// Struktur für detaillierte Werte je Fähigkeit (z. B. für Point Buy)
export interface AbilityDetail {
  base: number;  // Grundwert
  bonus: number;  // Boni aus verschiedenen Quellen
  total: number;  // Gesamtwert (base + bonus)
  modifier: number;  // Modifikator basierend auf dem Wert (z. B. (total - 10) / 2)
}

// Hier definierst du die AbilityMap als Record von Ability zu AbilityDetail
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
  bonus?: Partial<Record<Ability, number>>; // Optionale Boni für Fähigkeiten
  acBonus?: number; // Optionale Rüstungsboni
  description?: string; // Beschreibung des Ausrüstungsstücks
}

// Ausrüstung je Slot
export type CharacterEquipment = {
  [slot in EquipmentSlot]?: EquipmentItem;
};

// Feat (Talent) - wird in FeatSelector verwendet
export interface Feat {
  id: string;
  name: string;
  description: string;
  prerequisites: string[]; // z. B. "level 3", "Strength 14"
  effects: string[]; // Die Effekte des Talents (z. B. "Increase Strength by 2")
  abilityScoreIncrease: Record<string, number | null> | null; // Fähigkeitssteigerungen durch das Talent
}

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
  abilities: AbilityScores; // Abilities des Charakters
  proficiencies: string[]; // Alle Fertigkeiten und Fähigkeiten des Charakters
  features: string[]; // Besondere Merkmale des Charakters
  feats: string[]; // Alle Talente des Charakters
  spells: string[]; // Zaubersprüche des Charakters
  equipment: CharacterEquipment; // Ausrüstung des Charakters
  notes?: string; // Zusätzliche Notizen
  createdAt: string; // Erstellungsdatum des Charakters
  updatedAt: string; // Letzte Änderung
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
  components: string[]; // Materialien und Gesten für den Zauber
  description: string;
  classList: string[]; // Welche Klassen diesen Zauber nutzen können
}

// ToDo: Weitere Interfaces für Species, Class, Background, Feat usw.
