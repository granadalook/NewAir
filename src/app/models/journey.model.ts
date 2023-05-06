import { IFlight } from './flight.model';

export interface IJourney {
  flights: IFlight[];
  origin: string;
  destination: string;
  price: number;
}
