// src/app/feat-selector/feat-selector.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

// Definieren der Typen für die Props
export interface Feat {
  name: string;
  category: string;
  prerequisites: string[];
  description: string;
  id: string;
  abilityScoreIncrease: Record<string, number | null> | null;
  repeatable: boolean;
  grantsSpellcasting: boolean;
}

@Component({
  selector: 'app-feat-selector',
  templateUrl: './feat-selector.component.html',
  styleUrls: ['./feat-selector.component.css']
})
export class FeatSelectorComponent {
  @Input() feats: Feat[] = [];
  @Input() selectedFeats: string[] = [];
  @Input() level: number = 1;
  @Input() knownAbilities: Record<string, number> = {};
  @Input() hasSpellcasting: boolean = false;

  @Output() onToggle = new EventEmitter<string>();

  get validFeats() {
    return this.feats.filter(feat => {
      // Check if the feat is valid for the current level
      const levelIsValid = feat.prerequisites.includes(`level ${this.level}`);

      // Safely check ability score requirements
      const abilityIsValid = Object.entries(feat.abilityScoreIncrease || {}).every(
        ([key, value]) => (this.knownAbilities[key] || 0) >= (value || 0)
      );

      return levelIsValid && abilityIsValid;
    });
  }

  handleToggle(name: string) {
    this.onToggle.emit(name);
  }
}
