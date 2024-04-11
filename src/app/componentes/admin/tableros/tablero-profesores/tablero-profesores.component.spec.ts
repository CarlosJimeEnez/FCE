import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroProfesoresComponent } from './tablero-profesores.component';

describe('TableroProfesoresComponent', () => {
  let component: TableroProfesoresComponent;
  let fixture: ComponentFixture<TableroProfesoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableroProfesoresComponent]
    });
    fixture = TestBed.createComponent(TableroProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
