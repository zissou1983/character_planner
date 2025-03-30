// src/app/inventory-manager/inventory-manager.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inventory-manager',
  templateUrl: './inventory-manager.component.html',
  styleUrls: ['./inventory-manager.component.css']
})
export class InventoryManagerComponent {
  @Input() inventory: string[] = [];
  @Output() onAdd = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<number>();

  handleAddItem() {
    const item = prompt("Enter the inventory item:");
    if (item) {
      this.onAdd.emit(item);
    }
  }

  handleRemoveItem(index: number) {
    this.onRemove.emit(index);
  }
}
