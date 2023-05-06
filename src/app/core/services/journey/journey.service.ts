import { Injectable } from '@angular/core';
import { FlightsService } from '../flights/flights.service';
import { Observable } from 'rxjs';
import { IJourney } from 'src/app/models/journey.model';
import { IFlight } from 'src/app/models/flight.model';
import { ITransport } from 'src/app/models/transport.model';

@Injectable({
  providedIn: 'root',
})
export class JourneyService {
  journey!: IJourney;
  constructor(private flightsService: FlightsService) {}
  get(departure: string, arrival: string): Observable<IJourney> {
    return new Observable<IJourney>((observer) => {
      this.flightsService.get().subscribe((resp) => {
        const flights = resp.filter(
          (flight) =>
            flight.departureStation === departure &&
            flight.arrivalStation === arrival
        );
        const transpor: ITransport = {
          flightCarrier: flights[0].flightCarrier,
          flightNumber: flights[0].flightNumber,
        };
        const flight: Array<IFlight> = [
          {
            destination: departure,
            origin: arrival,
            price: flights[0].price,
            transport: transpor,
          },
        ];
        const journey: IJourney = {
          origin: departure,
          destination: arrival,
          price: flights[0].price,
          flights: flight,
        };
        observer.next(journey);
      });
    });
  }
}
