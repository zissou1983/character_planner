// src/app/character-builder/character-builder.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

// Definieren der Typen für die Props
export interface CharacterDetailsProps {
  name: string;
  gender: string;
  alignment: string;
  inspiration: boolean;
  languages: string[];
  knownLanguages: string[];
  abilities: Record<string, AbilityDetail>;  // Für die Fähigkeiten
  onDetailChange: (field: string, value: string | boolean) => void;
  onToggleLanguage: (lang: string) => void;
  onChange: () => void;
}

export interface AbilityDetail {
  base: number;
  bonus: number;
  total: number;
  modifier: number;
}

@Component({
  selector: 'app-character-builder',
  templateUrl: './character-builder.component.html',
  styleUrls: ['./character-builder.component.css']
})
export class CharacterBuilderComponent {
  @Input() name!: string;
  @Input() gender!: string;
  @Input() alignment!: string;
  @Input() inspiration!: boolean;
  @Input() languages!: string[];
  @Input() knownLanguages!: string[];
  @Input() abilities!: Record<string, AbilityDetail>;  // Input für abilities

  @Output() onDetailChange = new EventEmitter<{ field: string, value: string | boolean }>();
  @Output() onToggleLanguage = new EventEmitter<string>();

  handleDetailChange(field: string, value: string | boolean) {
    this.onDetailChange.emit({ field, value });
  }

  handleToggleLanguage(lang: string) {
    this.onToggleLanguage.emit(lang);
  }
}
