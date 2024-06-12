import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCarrerasComponent } from './post-carreras.component';

describe('PostCarrerasComponent', () => {
  let component: PostCarrerasComponent;
  let fixture: ComponentFixture<PostCarrerasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostCarrerasComponent]
    });
    fixture = TestBed.createComponent(PostCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
