import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesSelectorComponent } from './species-selector.component';

describe('SpeciesSelectorComponent', () => {
  let component: SpeciesSelectorComponent;
  let fixture: ComponentFixture<SpeciesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeciesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
