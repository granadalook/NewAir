import { Injectable } from '@angular/core';
import { FlightsService } from '../flights/flights.service';
import { Observable } from 'rxjs';
import { IJourney } from 'src/app/models/journey.model';
import { IFlight } from 'src/app/models/flight.model';
import { ITransport } from 'src/app/models/transport.model';
import { IFlightsResponse } from 'src/app/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class JourneyService {
  flights!: Array<IFlightsResponse>;
  constructor(private flightsService: FlightsService) {}
  get(departure: string, arrival: string): Observable<IJourney> {
    return new Observable<IJourney>((observer) => {
      this.flightsService.get().subscribe((resp) => {
        this.flights = resp;
        const flights = resp.filter(
          (flight) =>
            flight.departureStation === departure &&
            flight.arrivalStation === arrival
        );
        if (flights.length === 0) {
          const tres = this.getWithThreeConection(departure, arrival);
          observer.next(tres);
        } else {
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
        }
      });
    });
  }

  getWithThreeConection(departure: string, arrival: string): IJourney {
    const findDeparture = this.flights.filter(
      (res) => res.departureStation === departure
    );

    const findArrival = this.flights.filter(
      (res) => res.arrivalStation === arrival
    );

    const connections: Array<IFlightsResponse> = [];

    for (let i = 0; i < findDeparture.length; i++) {
      for (let j = 0; j < findArrival.length; j++) {
        const flights = this.flights.filter(
          (flight) =>
            flight.departureStation === findDeparture[i].arrivalStation &&
            flight.arrivalStation === findArrival[j].arrivalStation
        );
        connections.push(...flights);
      }
    }
    if (connections.length === 0) {
      for (let i = 0; i < findDeparture.length; i++) {
        for (let j = 0; j < findArrival.length; j++) {
          const flights = this.flights.filter(
            (flight) =>
              flight.departureStation === findDeparture[i].arrivalStation &&
              flight.arrivalStation === findArrival[j].departureStation
          );
          connections.push(...flights);
        }
      }
    }

    const transporA: ITransport = {
      flightCarrier: findDeparture.find(
        (res) => res.arrivalStation === connections[0].departureStation
      )?.flightCarrier,
      flightNumber: findDeparture.find(
        (res) => res.arrivalStation === connections[0].departureStation
      )?.flightNumber,
    };
    const transporB: ITransport = {
      flightCarrier: connections[0].flightCarrier,
      flightNumber: connections[0].flightNumber,
    };
    const transporC: ITransport = {
      flightCarrier: findArrival.find(
        (res) => res.departureStation === connections[0].arrivalStation
      )?.flightCarrier,
      flightNumber: findArrival.find(
        (res) => res.departureStation === connections[0].arrivalStation
      )?.flightNumber,
    };
    const flight: Array<IFlight> = [
      {
        destination: findDeparture.find(
          (res) => res.arrivalStation === connections[0].departureStation
        )?.departureStation,
        origin: findDeparture.find(
          (res) => res.arrivalStation === connections[0].departureStation
        )?.arrivalStation,
        price: findDeparture.find(
          (res) => res.arrivalStation === connections[0].departureStation
        )?.price,
        transport: transporA,
      },
      {
        destination: connections[0].departureStation,
        origin: connections[0].arrivalStation,
        price: connections[0].price,
        transport: transporB,
      },

      {
        destination: findArrival.find(
          (res) => res.departureStation === connections[0].arrivalStation
        )?.departureStation,
        origin: findArrival.find(
          (res) => res.departureStation === connections[0].arrivalStation
        )?.arrivalStation,
        price: findArrival.find(
          (res) => res.departureStation === connections[0].arrivalStation
        )?.price,
        transport: transporC,
      },
    ];
    const journey: IJourney = {
      origin: departure,
      destination: arrival,
      price: flight.reduce(
        (accumulator, current) => accumulator + (current.price || 0),
        0
      ),
      flights: flight,
    };
    return journey;
  }
}
