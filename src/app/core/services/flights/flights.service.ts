import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { IFlightsResponse } from 'src/app/models/response.model';
import { map, Observable } from 'rxjs';
import { UtilsService } from '../utils/utils.service';
@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  constructor(private http: HttpClient, private utilsService: UtilsService) {}

  get(): Observable<Array<IFlightsResponse>> {
    return this.http.get<Array<IFlightsResponse>>(`${environment.URL_BASE}`);
  }

  getDepartures(): Observable<Array<string>> {
    return this.get()
      .pipe(map((res) => res.map((flight) => flight.departureStation)))
      .pipe(map((res) => this.utilsService.getUniques(res)));
  }
  getArrivals(departure: string): Observable<Array<string>> {
    return this.get()
      .pipe(map((res) => res.map((flight) => flight.arrivalStation)))
      .pipe(map((res) => this.utilsService.getUniques(res)))
      .pipe(
        map((res) =>
          res.filter((arrival) => {
            return arrival != departure;
          })
        )
      );
  }
  
}
