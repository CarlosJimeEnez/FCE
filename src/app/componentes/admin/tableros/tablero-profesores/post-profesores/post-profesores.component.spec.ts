import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostProfesoresComponent } from './post-profesores.component';

describe('PostProfesoresComponent', () => {
  let component: PostProfesoresComponent;
  let fixture: ComponentFixture<PostProfesoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostProfesoresComponent]
    });
    fixture = TestBed.createComponent(PostProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
