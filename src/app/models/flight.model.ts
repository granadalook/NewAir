import { Itransport } from './transport.model';

export interface Iflight {
  transport: Itransport;
  origin: string;
  destination: string;
  price: number;
}
