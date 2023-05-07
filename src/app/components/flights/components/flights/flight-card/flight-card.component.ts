import { Component, Input } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ConversionService } from 'src/app/core/services/conversion/conversion-service.service';
import { IJourney } from 'src/app/models/journey.model';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent {
  from: string = 'USD';
  formatePrice!: number;
  @Input() journey!: IJourney;

  constructor(
    private conversionService: ConversionService,
    private formBuilder: UntypedFormBuilder
  ) {}
  currencyForm: UntypedFormGroup = this.formBuilder.group({
    currency: ['', [Validators.required, Validators.minLength(3)]],
  });
  ngOnInit(): void {
    this.formatePrice = this.journey.price;
  }
  convert(journey: IJourney, to: string) {
    this.conversionService
      .convertCurrency(to, this.from, journey.price)
      .subscribe((data) => {
        this.formatePrice = data.result;
      });
  }
}
