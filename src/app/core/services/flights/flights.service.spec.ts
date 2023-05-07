import { TestBed } from '@angular/core/testing';

import { FlightsService } from './flights.service';
import { UtilsService } from '../utils/utils.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FlightsService', () => {
  let service: FlightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UtilsService],
    });
    service = TestBed.inject(FlightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
