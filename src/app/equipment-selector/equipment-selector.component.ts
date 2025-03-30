// src/app/equipment-selector/equipment-selector.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

// Definieren der Typen für die Props
export interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  cost: string;
}

@Component({
  selector: 'app-equipment-selector',
  templateUrl: './equipment-selector.component.html',
  styleUrls: ['./equipment-selector.component.css']
})
export class EquipmentSelectorComponent {
  @Input() options: EquipmentItem[] = [];
  @Input() selected: string[] = [];

  @Output() onToggle = new EventEmitter<string>();

  handleToggle(name: string) {
    this.onToggle.emit(name);
  }
}
