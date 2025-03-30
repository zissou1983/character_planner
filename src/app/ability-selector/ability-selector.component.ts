// src/app/ability-selector/ability-selector.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

interface AbilityDetail {
  base: number;
  bonus: number;
  total: number;
  modifier: number;
}

@Component({
  selector: 'app-ability-selector',
  templateUrl: './ability-selector.component.html',
  styleUrls: ['./ability-selector.component.css'],
})
export class AbilitySelectorComponent {
  @Input() abilities: Record<string, AbilityDetail> = {};
  @Output() onChange = new EventEmitter<{ ability: string, newValue: number }>();

  // Funktion zum Ändern eines Wertes
  handleAbilityChange(ability: string, newValue: number) {
    this.onChange.emit({ ability, newValue });
  }
}
