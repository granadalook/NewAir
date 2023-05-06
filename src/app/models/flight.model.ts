import { ITransport } from './transport.model';

export interface IFlight {
  transport: ITransport;
  origin?: string;
  destination?: string;
  price?: number;
}
