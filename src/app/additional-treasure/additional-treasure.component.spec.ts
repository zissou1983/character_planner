import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalTreasureComponent } from './additional-treasure.component';

describe('AdditionalTreasureComponent', () => {
  let component: AdditionalTreasureComponent;
  let fixture: ComponentFixture<AdditionalTreasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalTreasureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalTreasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
