import { Component, Input } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ConversionService } from 'src/app/core/services/conversion/conversion-service.service';
import { IJourney } from 'src/app/models/journey.model';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent {
  from: string = 'USD';

  @Input() journeys?: Array<IJourney>;
  constructor(
    private conversionService: ConversionService,
    private formBuilder: UntypedFormBuilder
  ) {}

  currencyForm: UntypedFormGroup = this.formBuilder.group({
    currency: ['', [Validators.required, Validators.minLength(3)]],
  });
  convert(journey: IJourney, to: string) {
    this.conversionService
      .convertCurrency(to, this.from, journey.price)
      .subscribe((data) => {
        this.from = to;
        journey.price = data.result;
      });
  }
}
