import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCalculationTypeComponent } from './select-calculation-type.component';

describe('SelectCalculationTypeComponent', () => {
  let component: SelectCalculationTypeComponent;
  let fixture: ComponentFixture<SelectCalculationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCalculationTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCalculationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
