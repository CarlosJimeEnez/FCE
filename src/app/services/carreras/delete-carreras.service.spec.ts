import { TestBed } from '@angular/core/testing';

import { DeleteCarrerasService } from './delete-carreras.service';

describe('DeleteCarrerasService', () => {
  let service: DeleteCarrerasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteCarrerasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
