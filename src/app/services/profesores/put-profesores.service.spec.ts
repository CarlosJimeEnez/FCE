import { TestBed } from '@angular/core/testing';

import { PutProfesoresService } from './put-profesores.service';

describe('PutProfesoresService', () => {
  let service: PutProfesoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PutProfesoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
