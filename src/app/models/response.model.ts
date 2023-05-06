export interface IFlightsResponse {
  departureStation: string;
  arrivalStation: string;
  flightCarrier: FlightCarrier;
  flightNumber: string;
  price: number;
}

export enum FlightCarrier {
  Co = 'CO',
  Es = 'ES',
  MX = 'MX',
}
