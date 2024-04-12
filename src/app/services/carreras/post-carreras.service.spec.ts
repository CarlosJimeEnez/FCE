import { TestBed } from '@angular/core/testing';

import { PostCarrerasService } from './post-carreras.service';

describe('PostCarrerasService', () => {
  let service: PostCarrerasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCarrerasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
