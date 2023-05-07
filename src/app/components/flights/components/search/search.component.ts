import { Component } from '@angular/core';
import { FlightsService } from 'src/app/core/services/flights/flights.service';
import { IFlightsResponse } from 'src/app/models/response.model';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { JourneyService } from 'src/app/core/services/journey/journey.service';
import { IDataForm } from 'src/app/models/dataForm.model';
import { IJourney } from 'src/app/models/journey.model';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  flights!: Array<IFlightsResponse>;
  journeys!: Array<IJourney>;
  departures!: Array<string>;
  arrivals!: Array<string>;

  constructor(
    private flightsService: FlightsService,
    private formBuilder: UntypedFormBuilder,
    private journeyService: JourneyService
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
  getFligths(): void {
    this.flightsService.get().subscribe((res) => {
      this.flights = res;
    });
  }
  getDeparture(): void {
    this.flightsService.getDepartures().subscribe((departures) => {
      this.departures = departures;
    });
  }
  getArrivals(departure: string): void {
    this.flightsService.getArrivals(departure).subscribe((arrivals) => {
      this.arrivals = arrivals;
    });
  }
  getJourney(data: IDataForm): void {
    this.journeyService.get(data.departure, data.arrival).subscribe((resp) => {
      this.journeys = resp;
    });
  }
}
