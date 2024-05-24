import { TestBed } from '@angular/core/testing';

import { PostAdsService } from './post-ads.service';

describe('PostAdsService', () => {
  let service: PostAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
