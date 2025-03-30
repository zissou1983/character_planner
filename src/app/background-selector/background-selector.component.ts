import { Component, Input, Output, EventEmitter } from '@angular/core';

// Interface für Background-Daten
export interface Background {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-background-selector',
  templateUrl: './background-selector.component.html',
  styleUrls: ['./background-selector.component.css']
})
export class BackgroundSelectorComponent {
  // Eingabeparameter für die Komponente
  @Input() backgrounds: Background[] = [];
  @Input() selected: string = '';
  @Output() onSelect = new EventEmitter<string>();

  // Handler für die Auswahl eines Hintergrunds
  handleSelect(id: string) {
    this.onSelect.emit(id);
  }
}
