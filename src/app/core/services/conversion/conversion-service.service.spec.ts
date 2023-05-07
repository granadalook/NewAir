import { TestBed } from '@angular/core/testing';

import { ConversionServiceService } from './conversion-service.service';

describe('ConversionServiceService', () => {
  let service: ConversionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
