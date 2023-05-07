import { TestBed } from '@angular/core/testing';

import { JourneyService } from './journey.service';
import { FlightsService } from '../flights/flights.service';
import { LocalstorageService } from '../local.storage/localstorage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JourneyService', () => {
  let service: JourneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocalstorageService, FlightsService],
    });
    service = TestBed.inject(JourneyService);
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
