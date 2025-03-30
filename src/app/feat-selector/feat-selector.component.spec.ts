import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatSelectorComponent } from './feat-selector.component';

describe('FeatSelectorComponent', () => {
  let component: FeatSelectorComponent;
  let fixture: ComponentFixture<FeatSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
