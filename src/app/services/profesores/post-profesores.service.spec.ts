import { TestBed } from '@angular/core/testing';

import { PosttProfesoresService } from './post-profesores.service';

describe('PosttProfesoresService', () => {
  let service: PosttProfesoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosttProfesoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
