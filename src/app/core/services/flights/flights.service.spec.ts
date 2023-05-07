import { TestBed } from '@angular/core/testing';

import { FlightsService } from './flights.service';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environments';
import { IFlightsResponse } from 'src/app/models/response.model';
import { LocalstorageService } from '../local.storage/localstorage.service';

describe('FlightsService', () => {
  let service: FlightsService;
  let httpMock: HttpTestingController;
  let localStorageSpy: jasmine.SpyObj<LocalstorageService>;

  beforeEach(() => {
    const localStorageServiceSpy = jasmine.createSpyObj('LocalstorageService', [
      'get',
      'set',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FlightsService,
        { provide: LocalstorageService, useValue: localStorageServiceSpy },
      ],
    });
    service = TestBed.inject(FlightsService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorageSpy = TestBed.inject(
      LocalstorageService
    ) as jasmine.SpyObj<LocalstorageService>;
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  afterEach(() => {
    httpMock.verify();
  });

  describe('get', () => {
    it('should return flights from localStorage when available', () => {
      const flights: IFlightsResponse[] = [
        {
          departureStation: 'MZL',
          arrivalStation: 'PEI',
          flightCarrier: 'CO',
          flightNumber: '8008',
          price: 200,
        },
        {
          departureStation: 'MDE',
          arrivalStation: 'CTG',
          flightCarrier: 'CO',
          flightNumber: '8009',
          price: 200,
        },
      ];
      localStorageSpy.get
        .withArgs(environment.FLIGHTS_LOCAL_STORAGE_ID)
        .and.returnValue(flights);

      service.get().subscribe((data: IFlightsResponse[]) => {
        expect(data).toEqual(flights);
      });

      expect(localStorageSpy.get).toHaveBeenCalledWith(
        environment.FLIGHTS_LOCAL_STORAGE_ID
      );
    });

    it('should make http get request and return flights when not available in localStorage', () => {
      const flights: IFlightsResponse[] = [
        {
          departureStation: 'MZL',
          arrivalStation: 'PEI',
          flightCarrier: 'CO',
          flightNumber: '8008',
          price: 200,
        },
        {
          departureStation: 'MDE',
          arrivalStation: 'CTG',
          flightCarrier: 'CO',
          flightNumber: '8009',
          price: 200,
        },
      ];
      localStorageSpy.get
        .withArgs(environment.FLIGHTS_LOCAL_STORAGE_ID)
        .and.returnValue(null);

      service.get().subscribe((data: IFlightsResponse[]) => {
        expect(data).toEqual(flights);
      });

      const req = httpMock.expectOne(`${environment.URL_BASE}`);
      expect(req.request.method).toBe('GET');
      req.flush(flights);

      expect(localStorageSpy.set).toHaveBeenCalledWith(
        environment.FLIGHTS_LOCAL_STORAGE_ID,
        flights
      );
    });
  });
});
