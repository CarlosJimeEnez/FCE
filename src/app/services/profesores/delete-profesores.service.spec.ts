import { TestBed } from '@angular/core/testing';

import { DeleteProfesoresService } from './delete-profesores.service';

describe('DeleteProfesoresService', () => {
  let service: DeleteProfesoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteProfesoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
