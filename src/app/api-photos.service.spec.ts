import { TestBed } from '@angular/core/testing';

import { ApiPhotosService } from './api-photos.service';

describe('ApiPhotosService', () => {
  let service: ApiPhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
