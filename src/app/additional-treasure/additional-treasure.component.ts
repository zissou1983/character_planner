// src/app/additional-treasure/additional-treasure.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-additional-treasure',
  templateUrl: './additional-treasure.component.html',
  styleUrls: ['./additional-treasure.component.css']
})
export class AdditionalTreasureComponent {
  @Input() treasure: string[] = [];
  @Output() onAdd = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<number>();

  handleAddTreasure(treasureItem: string): void {
    this.onAdd.emit(treasureItem);
  }

  handleRemoveTreasure(index: number): void {
    this.onRemove.emit(index);
  }
}
