import { Injectable } from '@angular/core';
import { FlightsService } from '../flights/flights.service';
import { Observable } from 'rxjs';
import { IJourney } from 'src/app/models/journey.model';
import { IFlight } from 'src/app/models/flight.model';
import { ITransport } from 'src/app/models/transport.model';
import { IFlightsResponse } from 'src/app/models/response.model';
import { LocalstorageService } from '../local.storage/localstorage.service';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class JourneyService {
  constructor(
    private flightsService: FlightsService,
    private localstorageService: LocalstorageService
  ) {}
  get(departure: string, arrival: string): Observable<Array<IJourney>> {
    return new Observable<Array<IJourney>>((observer) => {
      this.flightsService.get().subscribe((resp: Array<IFlightsResponse>) => {
        this.localstorageService.set(
          environment.FLIGHTS_LOCAL_STORAGE_ID,
          resp
        );
        const flights = resp.filter(
          (flight) =>
            flight.departureStation == departure &&
            flight.arrivalStation == arrival
        );
        if (flights.length === 0) {
          observer.next(this.getWithConection(departure, arrival));
        } else {
          const journeys = flights.map((flight) =>
            this.createJourney(departure, arrival, [flight])
          );
          observer.next(journeys);
        }
      });
    });
  }

  createJourney(
    departure: string,
    arrival: string,
    flightsResponse: Array<IFlightsResponse>
  ) {
    const flights = this.mapFlightsResponseToFlight(flightsResponse);
    const journey: IJourney = {
      origin: departure,
      destination: arrival,
      price: flights.reduce(
        (accumulator, current) => accumulator + (current.price || 0),
        0
      ),
      flights: flights,
    };
    return journey;
  }

  mapFlightsResponseToFlight(
    flightResponse: Array<IFlightsResponse>
  ): Array<IFlight> {
    return flightResponse.map((flight) => {
      return {
        destination: flight.arrivalStation,
        origin: flight.departureStation,
        price: flight.price,
        transport: {
          flightCarrier: flight.flightCarrier,
          flightNumber: flight.flightNumber,
        } as ITransport,
      } as IFlight;
    });
  }
  getStopFlights(
    departure: string,
    arrival: string,
    flights: Array<IFlightsResponse>
  ) {
    const departureArrivals = flights.filter(
      (res) => res.departureStation === departure
    );
    const stops = departureArrivals.map((item) => {
      return flights.find(
        (flight) =>
          flight.departureStation === item.arrivalStation &&
          flight.arrivalStation === arrival
      );
    });
    return stops.filter((res) => res?.arrivalStation != undefined);
  }

  getWithConection(departure: string, arrival: string): Array<IJourney> {
    const stopFlights = this.getStopFlights(
      departure,
      arrival,
      this.localstorageService.get<Array<IFlightsResponse>>(
        environment.FLIGHTS_LOCAL_STORAGE_ID
      ) || []
    );
    let journeys: Array<IJourney> = [];
    if (stopFlights.length > 0) {
      stopFlights.forEach((stop) => {
        const localStorageflights = this.localstorageService.get<
          Array<IFlightsResponse>
        >(environment.FLIGHTS_LOCAL_STORAGE_ID);
        const departureFlight = (localStorageflights || []).find(
          (res) =>
            res.departureStation === departure &&
            res.arrivalStation === stop?.departureStation
        );
        const flights = [departureFlight, stop] as Array<IFlightsResponse>;
        journeys.push(this.createJourney(departure, arrival, flights));
      });
    }
    return journeys;
  }
}
