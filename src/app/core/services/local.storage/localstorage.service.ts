import { Injectable } from '@angular/core';
import { Subscription, tap, timer } from 'rxjs';
import { IFlightsResponse } from 'src/app/models/response.model';
const FLIGHTS = 'flights';
@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  private clearSubscription: Subscription;

  constructor() {
    this.clearSubscription = timer(0, 24 * 60 * 60 * 1000)
      .pipe(
        tap(() => {
          this.clear();
        })
      )
      .subscribe();
  }

  setFlights(flights: Array<IFlightsResponse>) {
    window.localStorage.removeItem(FLIGHTS);
    window.localStorage.setItem(FLIGHTS, JSON.stringify(flights));
  }

  getFlights(): Array<IFlightsResponse> {
    const flightsJson = localStorage.getItem(FLIGHTS);
    return flightsJson ? JSON.parse(flightsJson) : null;
  }

  clear() {
    window.localStorage.clear();
  }

  stopClearSubscription() {
    this.clearSubscription.unsubscribe();
  }
}
