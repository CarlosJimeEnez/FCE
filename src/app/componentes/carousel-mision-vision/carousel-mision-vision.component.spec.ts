import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselMisionVisionComponent } from './carousel-mision-vision.component';

describe('CarouselMisionVisionComponent', () => {
  let component: CarouselMisionVisionComponent;
  let fixture: ComponentFixture<CarouselMisionVisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselMisionVisionComponent]
    });
    fixture = TestBed.createComponent(CarouselMisionVisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
