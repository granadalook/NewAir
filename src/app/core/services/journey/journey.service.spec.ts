import { TestBed } from '@angular/core/testing';

import { JourneyService } from './journey.service';
import { FlightsService } from '../flights/flights.service';
import { LocalstorageService } from '../local.storage/localstorage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IFlightsResponse } from 'src/app/models/response.model';

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
  describe('createJourney()', () => {
    it('should create a journey with correct origin, destination, and price', () => {
      // Arrange
      const departure = 'London';
      const arrival = 'New York';
      const flightsResponse = [
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

      // Act
      const journey = service.createJourney(
        departure,
        arrival,
        flightsResponse
      );

      // Assert
      expect(journey.origin).toBe(departure);
      expect(journey.destination).toBe(arrival);
      expect(journey.price).toBe(400); // sum of all flight prices
    });
  });

  it('should return an array of stop flights', () => {
    const flights: Array<IFlightsResponse> = [
      {
        departureStation: 'A',
        arrivalStation: 'B',
        flightCarrier: 'Carrier A',
        flightNumber: '123',
        price: 100,
      },
      {
        departureStation: 'B',
        arrivalStation: 'C',
        flightCarrier: 'Carrier B',
        flightNumber: '456',
        price: 200,
      },
      {
        departureStation: 'A',
        arrivalStation: 'C',
        flightCarrier: 'Carrier C',
        flightNumber: '789',
        price: 300,
      },
    ];

    const stopFlights = service.getStopFlights('A', 'C', flights);
    expect(stopFlights).toBeDefined();
    expect(stopFlights.length).toBe(1);
    expect(stopFlights[0]).toBeDefined();

    if (stopFlights[0]) {
      expect(stopFlights[0].departureStation).toBe('B');
      expect(stopFlights[0].arrivalStation).toBe('C');
      expect(stopFlights[0].flightCarrier).toBe('Carrier B');
      expect(stopFlights[0].flightNumber).toBe('456');
      expect(stopFlights[0].price).toBe(200);
    }
  });
  it('should return an array of journeys with connections when stop flights are available', () => {
    const departure = 'A';
    const arrival = 'D';
    const flights: Array<IFlightsResponse> = [
      {
        departureStation: 'A',
        arrivalStation: 'B',
        flightCarrier: 'Airline A',
        flightNumber: '001',
        price: 100,
      },
      {
        departureStation: 'B',
        arrivalStation: 'C',
        flightCarrier: 'Airline A',
        flightNumber: '002',
        price: 150,
      },
      {
        departureStation: 'B',
        arrivalStation: 'D',
        flightCarrier: 'Airline B',
        flightNumber: '003',
        price: 200,
      },
    ];

    const journeys = service.getWithConection(departure, arrival, flights);

    expect(journeys.length).toBe(1);

    expect(journeys[0].origin).toBe(departure);
    expect(journeys[0].destination).toBe(arrival);
    expect(journeys[0].price).toBe(300);
    expect(journeys[0].flights.length).toBe(2);
    expect(journeys[0].flights[0].origin).toBe('A');
    expect(journeys[0].flights[0].destination).toBe('B');
    expect(journeys[0].flights[1].origin).toBe('B');
    expect(journeys[0].flights[1].destination).toBe('D');
  });
});
