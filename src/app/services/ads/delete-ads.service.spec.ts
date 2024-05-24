import { TestBed } from '@angular/core/testing';

import { DeleteAdsService } from './delete-ads.service';

describe('DeleteAdsService', () => {
  let service: DeleteAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
