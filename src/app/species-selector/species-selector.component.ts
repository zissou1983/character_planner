// src/app/species-selector/species-selector.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-species-selector',
  templateUrl: './species-selector.component.html',
  styleUrls: ['./species-selector.component.css']
})
export class SpeciesSelectorComponent {
  @Input() speciesList: { id: string; name: string; description: string; lineages: { id: string; name: string; description: string }[] }[] = [];
  @Input() selected: string = '';
  @Output() onSelect = new EventEmitter<string>();

  handleSelectionChange(value: string) {
    this.onSelect.emit(value);
  }
}
