import { TestBed } from '@angular/core/testing';

import { PutAdsService } from './put-ads.service';

describe('PutAdsService', () => {
  let service: PutAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PutAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
