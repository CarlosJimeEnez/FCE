import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroAdminComponent } from './tablero-admin.component';

describe('TableroAdminComponent', () => {
  let component: TableroAdminComponent;
  let fixture: ComponentFixture<TableroAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableroAdminComponent]
    });
    fixture = TestBed.createComponent(TableroAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
