import { Component, OnInit } from '@angular/core';
import { AbilityDetail, Feat, AbilityScores } from '../../types/character'; 
import { hasSpellcasting } from '../../utils/spellcasting'; 
import abilitiesData from '../data/2024/abilities.json';
import speciesData from '../data/2024/species.json'; 
import classesData from '../data/2024/classes.json'; 
import backgroundsData from '../data/2024/backgrounds.json'; 
import featsData from '../data/2024/feats.json'; 
import equipmentData from '../data/2024/equipment.json';
import languagesData from '../data/2024/languagesData.json';

@Component({
  selector: 'app-character-builder-layout',
  templateUrl: './character-builder-layout.component.html',
  styleUrls: ['./character-builder-layout.component.css']
})
export class CharacterBuilderLayoutComponent implements OnInit {
  name = '';
  gender = '';
  alignment = '';
  inspiration = false;
  species = '';
  background = '';
  characterClass = '';
  level = 1;
  languages: string[] = [];
  selectedFeats: string[] = [];
  equipment: string[] = [];
  inventory: string[] = [];
  treasure: string[] = [];
  abilities: Record<string, AbilityDetail> = {};

  ngOnInit(): void {
    const initAbilities: Record<string, AbilityDetail> = {};
    abilitiesData.forEach((ability: { id: string }) => {
      initAbilities[ability.id.toUpperCase()] = {
        base: 10,
        bonus: 0,
        total: 10,
        modifier: 0
      };
    });
    this.abilities = initAbilities;
  }

  handleAbilityChange(ability: keyof AbilityScores, newValue: number): void {  
    const abilityString = String(ability).toUpperCase();
    this.abilities[abilityString] = {
      ...this.abilities[abilityString],
      total: newValue,
      modifier: Math.floor((newValue - 10) / 2),
    };
  }

  handleFeatToggle(feat: Feat | string): void {
    let featId: string;
  
    // If feat is a Feat object, use its id property
    if (typeof feat === 'object' && feat !== null && 'id' in feat) {
      featId = feat.id;
    } else {
      // Otherwise assume it's a string
      featId = feat as string;
    }
  
    const index = this.selectedFeats.indexOf(featId);
    if (index !== -1) {
      this.selectedFeats.splice(index, 1);
    } else {
      this.selectedFeats.push(featId);
    }
  }

  handleAddItem(item: string): void {
    this.inventory.push(item);
  }

  handleRemoveItem(index: number): void {
    this.inventory.splice(index, 1);
  }

  handleAddTreasure(item: string): void {
    this.treasure.push(item);
  }

  handleRemoveTreasure(index: number): void {
    this.treasure.splice(index, 1);
  }

  getSpellcasting(): boolean {
    return hasSpellcasting(this.characterClass, this.level);
  }

  transformedFeatsData = featsData.map((feat: Feat) => {
    let abilityScoreIncrease: Record<string, number> = {};
    if (feat.abilityScoreIncrease !== null) {
      Object.entries(feat.abilityScoreIncrease).forEach(([key, value]) => {
        if (value !== undefined) {
          abilityScoreIncrease[key] = value === null ? 0 : Number(value);
        }
      });
    }
    return {
      ...feat,
      abilityScoreIncrease
    };
  });
}