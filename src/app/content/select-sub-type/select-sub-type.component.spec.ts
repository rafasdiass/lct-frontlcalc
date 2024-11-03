import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSubTypeComponent } from './select-sub-type.component';

describe('SelectSubTypeComponent', () => {
  let component: SelectSubTypeComponent;
  let fixture: ComponentFixture<SelectSubTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSubTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSubTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
