import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarrerasComponent } from './edit-carreras.component';

describe('EditCarrerasComponent', () => {
  let component: EditCarrerasComponent;
  let fixture: ComponentFixture<EditCarrerasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCarrerasComponent]
    });
    fixture = TestBed.createComponent(EditCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
