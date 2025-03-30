// src/app/summary-tab/summary-tab.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-tab',
  templateUrl: './summary-tab.component.html',
  styleUrls: ['./summary-tab.component.css']
})
export class SummaryTabComponent {
  @Input() name!: string;
  @Input() gender!: string;
  @Input() alignment!: string;
  @Input() species!: string;
  @Input() characterClass!: string;
  @Input() background!: string;
  @Input() abilities!: any;
  @Input() feats!: string[];
  @Input() equipment!: string[];
  @Input() languages!: string[];
  @Input() inventory!: string[];

  // Diese Methode gibt die Schlüssel des 'abilities' Objekts zurück
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
