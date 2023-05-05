import { Iflight } from './flight.model';

export interface Ijourney {
  flights: Iflight[];
  origin: string;
  destination: string;
  price: number;
}
