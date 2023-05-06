import { Component } from '@angular/core';
import { FlightsService } from 'src/app/core/services/flights/flights.service';
import { IflightsResponse } from 'src/app/models/response.model';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  flights!: Array<IflightsResponse>;
  departures!: Array<string>;
  arrivals!: Array<string>;

  constructor(
    private flightsService: FlightsService,
    private formBuilder: UntypedFormBuilder
  ) {}

  formSearh: UntypedFormGroup = this.formBuilder.group({
    departure: ['', [Validators.required, Validators.minLength(3)]],
    arrival: ['', [Validators.required, Validators.minLength(3)]],
  });
  ngOnInit(): void {
    this.getDeparture();
    this.changesDepartureSubscription();
  }

  changesDepartureSubscription(): void {
    this.formSearh.get('departure')?.valueChanges.subscribe((value) => {
      this.getArrivals(value);
    });
  }
  getFligths() {
    this.flightsService.getFlights().subscribe((res) => {
      this.flights = res;
    });
  }
  getDeparture() {
    this.flightsService.getDepartures().subscribe((departures) => {
      this.departures = departures;
    });
  }
  getArrivals(departure: string) {
    this.flightsService.getArrivals(departure).subscribe((arrivals) => {
      this.arrivals = arrivals;
    });
  }

  search(date: any) {}
}
