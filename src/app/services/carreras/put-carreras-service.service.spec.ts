import { TestBed } from '@angular/core/testing';

import { PutCarrerasServiceService } from './put-carreras-service.service';

describe('PutCarrerasServiceService', () => {
  let service: PutCarrerasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PutCarrerasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
