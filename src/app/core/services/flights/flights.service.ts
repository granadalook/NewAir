import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { IflightsResponse } from 'src/app/models/response.model';
import { map } from 'rxjs';
import { UtilsService } from '../utils/utils.service';
@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  constructor(private http: HttpClient, private utilsService: UtilsService) {}

  getFlights() {
    return this.http.get<Array<IflightsResponse>>(`${environment.URL_BASE}`);
  }

  getDepartures() {
    return this.getFlights()
      .pipe(map((res) => res.map((flight) => flight.departureStation)))
      .pipe(map((res) => this.utilsService.getUniques(res)));
  }
  getArrivals(departure: string) {
    return this.getFlights()
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
