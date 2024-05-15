import { TestBed } from '@angular/core/testing';

import { CarrerasServicesService } from './carreras-services.service';

describe('CarrerasServicesService', () => {
  let service: CarrerasServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrerasServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
