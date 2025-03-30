import { Component } from '@angular/core';

// Interface für die Abilities
interface AbilityDetail {
  base: number;
  bonus: number;
  total: number;
  modifier: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Initiale Werte für die Eingaben
  name = '';
  gender = '';
  alignment = '';
  inspiration = false;
  languages = ['Common', 'Elvish'];  // Beispielsprachen
  knownLanguages: string[] = [];
  
  // Abilities korrekt typisieren mit einer Index-Signatur
  abilities: { [key: string]: AbilityDetail } = {
    Strength: { base: 10, bonus: 2, total: 12, modifier: 1 },
    Dexterity: { base: 10, bonus: 2, total: 12, modifier: 1 }
  };

  feats: string[] = [];
  equipment: string[] = [];
  inventory: string[] = [];
  treasure: string[] = [];

  // Methode zum Bearbeiten von Detailänderungen
  handleDetailChange(field: string, value: string | boolean) {
    // Je nach Typ des Feldes (String oder Boolean) ändern wir die Daten
    if (field === 'name') {
      this.name = value as string;
    } else if (field === 'gender') {
      this.gender = value as string;
    } else if (field === 'alignment') {
      this.alignment = value as string;
    } else if (field === 'inspiration') {
      this.inspiration = value as boolean;
    }
  }

  // Methode zum Hinzufügen oder Entfernen von Sprachen
  handleToggleLanguage(lang: string) {
    const index = this.knownLanguages.indexOf(lang);
    if (index === -1) {
      this.knownLanguages.push(lang);
    } else {
      this.knownLanguages.splice(index, 1);
    }
  }

  // Methode zum Ändern von Fähigkeiten
  handleAbilityChange(event: { ability: string, newValue: number }) {
    if (this.abilities[event.ability]) {
      this.abilities[event.ability].total = event.newValue;
      this.abilities[event.ability].modifier = Math.floor((event.newValue - 10) / 2);
    }
  }

  // Methode zum Hinzufügen oder Entfernen von Feats
  handleFeatSelection(feat: string) {
    const index = this.feats.indexOf(feat);
    if (index === -1) {
      this.feats.push(feat);
    } else {
      this.feats.splice(index, 1);
    }
  }

  // Methode zum Hinzufügen oder Entfernen von Inventar
  handleAddItem(item: string) {
    this.inventory.push(item);
  }

  handleRemoveItem(item: string) {
    const index = this.inventory.indexOf(item);
    if (index !== -1) {
      this.inventory.splice(index, 1);
    }
  }

  // Methode zum Ändern von Equipment
  handleEquipmentChange(item: string) {
    const index = this.equipment.indexOf(item);
    if (index === -1) {
      this.equipment.push(item);
    } else {
      this.equipment.splice(index, 1);
    }
  }

  // Methode zum Hinzufügen von zusätzlichem Schatz
  handleAddTreasure(treasureItem: string) {
    this.treasure.push(treasureItem);
  }

  handleRemoveTreasure(treasureItem: string) {
    const index = this.treasure.indexOf(treasureItem);
    if (index !== -1) {
      this.treasure.splice(index, 1);
    }
  }
}
