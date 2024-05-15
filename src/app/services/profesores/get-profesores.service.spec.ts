import { TestBed } from '@angular/core/testing';

import { GetProfesoresService } from './get-profesores.service';

describe('GetProfesoresService', () => {
  let service: GetProfesoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProfesoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
