import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { IFlightsResponse } from 'src/app/models/response.model';
import { Observable, tap } from 'rxjs';
import { LocalstorageService } from '../local.storage/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalstorageService
  ) {}

  get(): Observable<Array<IFlightsResponse>> {
    const flights = this.localStorage.get<Array<IFlightsResponse>>(
      environment.FLIGHTS_LOCAL_STORAGE_ID
    );
    if (flights) {
      return new Observable((observer) => {
        observer.next(flights);
      });
    }
    return this.http
      .get<Array<IFlightsResponse>>(`${environment.URL_BASE}`)
      .pipe(
        tap((res) => {
          this.localStorage.set(environment.FLIGHTS_LOCAL_STORAGE_ID, res);
        })
      );
  }
}
