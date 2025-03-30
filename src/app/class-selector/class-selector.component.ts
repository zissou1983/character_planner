// src/app/class-selector/class-selector.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

// Definieren der Typen für die Props
export interface Class {
  id: string;
  name: string;
  hitDie: string;
  subclasses: string[];
  spellcasting: boolean;
}

@Component({
  selector: 'app-class-selector',
  templateUrl: './class-selector.component.html',
  styleUrls: ['./class-selector.component.css']
})
export class ClassSelectorComponent {
  @Input() classes: Class[] = [];
  @Input() selected: string = '';
  
  @Output() onSelect = new EventEmitter<string>();

  handleClassSelection(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.onSelect.emit(value);
  }
}
