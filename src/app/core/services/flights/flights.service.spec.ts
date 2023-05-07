import { TestBed } from '@angular/core/testing';

import { FlightsService } from './flights.service';
import { UtilsService } from '../utils/utils.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environments';
import { IFlightsResponse } from 'src/app/models/response.model';
import { of } from 'rxjs';

describe('FlightsService', () => {
  let service: FlightsService;
  let httpMock: HttpTestingController;
  let utilsServiceSpy: jasmine.SpyObj<UtilsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UtilsService', ['getUniques']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UtilsService,
        FlightsService,
        { provide: UtilsService, useValue: spy },
      ],
    });
    service = TestBed.inject(FlightsService);
    httpMock = TestBed.inject(HttpTestingController);
    utilsServiceSpy = TestBed.inject(
      UtilsService
    ) as jasmine.SpyObj<UtilsService>;
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('get', () => {
    it('should make a GET request to the correct URL', () => {
      service.get().subscribe();

      const req = httpMock.expectOne(`${environment.URL_BASE}`);
      expect(req.request.method).toBe('GET');
    });

    it('should return an array of IFlightsResponse', () => {
      const mockResponse: Array<IFlightsResponse> = [
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

      service.get().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.URL_BASE}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
  describe('getDepartures', () => {
    it('should call get method', () => {
      spyOn(service, 'get').and.returnValue(of([]));
      service.getDepartures().subscribe();
      expect(service.get).toHaveBeenCalled();
    });

    it('should call utilsService.getUniques', () => {
      spyOn(service, 'get').and.returnValue(of([]));
      utilsServiceSpy.getUniques.and.returnValue([]);
      service.getDepartures().subscribe();
      expect(utilsServiceSpy.getUniques).toHaveBeenCalled();
    });

    it('should return an array of unique departure stations', () => {
      const mockResponse: Array<IFlightsResponse> = [
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

      const mockDepartures = ['MDE', 'CTG'];

      spyOn(service, 'get').and.returnValue(of(mockResponse));
      utilsServiceSpy.getUniques.and.returnValue(mockDepartures);

      service.getDepartures().subscribe((response) => {
        expect(response).toEqual(mockDepartures);
      });
    });
  });
  /* describe('getArrivals', () => {
    it('should return a list of unique arrival stations that are not the departure station', () => {
      const mockResponse: Array<IFlightsResponse> = [
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

      const expectedArrivals = ['MDE'];

      service.getArrivals('MDE').subscribe((arrivals) => {
        expect(arrivals).toEqual(expectedArrivals);
      });

      const req = httpMock.expectOne(`${environment.URL_BASE}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  }); */
});
