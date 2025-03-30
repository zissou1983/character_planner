import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Falls ngModel verwendet wird

// Importiere die benötigten Komponenten
import { AppComponent } from './app.component';
import { BackgroundSelectorComponent } from './background-selector/background-selector.component';
import { AbilitySelectorComponent } from './ability-selector/ability-selector.component';
import { FeatSelectorComponent } from './feat-selector/feat-selector.component';
import { InventoryManagerComponent } from './inventory-manager/inventory-manager.component';
import { ClassSelectorComponent } from './class-selector/class-selector.component';
import { EquipmentSelectorComponent } from './equipment-selector/equipment-selector.component';
import { SummaryTabComponent } from './summary-tab/summary-tab.component';
import { AdditionalTreasureComponent } from './additional-treasure/additional-treasure.component';
import { SpeciesSelectorComponent } from './species-selector/species-selector.component';
import { CharacterBuilderComponent } from './character-builder/character-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundSelectorComponent,
    AbilitySelectorComponent,
    FeatSelectorComponent,
    InventoryManagerComponent,
    ClassSelectorComponent,
    EquipmentSelectorComponent,
    SummaryTabComponent,  // Stelle sicher, dass die Komponenten hier eingetragen sind
    AdditionalTreasureComponent,
    SpeciesSelectorComponent,
    CharacterBuilderComponent
  ],
  imports: [
    BrowserModule,  // Wir brauchen hier nur BrowserModule, CommonModule ist nicht nötig
    FormsModule,    // Falls ngModel genutzt wird
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
