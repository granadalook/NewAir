import { Component, Input } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ICurrency } from 'src/app/models/currency.model';
import { IJourney } from 'src/app/models/journey.model';
import { CurrencyService } from '../../../../../core/services/currency/currency.service';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent {
  from: string = 'USD';
  formatePrice!: number;
  currencies!: Array<ICurrency>;
  @Input() journey!: IJourney;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private currencyService: CurrencyService
  ) {}
  currencyForm: UntypedFormGroup = this.formBuilder.group({
    currency: ['', [Validators.required, Validators.minLength(3)]],
  });
  ngOnInit(): void {
    this.formatePrice = this.journey?.price;
    this.currencies = this.currencyService.get();
  }
  convert(journey: IJourney, to: string) {
    this.currencyService
      .convert(to, this.from, journey.price)
      .subscribe((data) => {
        this.formatePrice = data.result;
      });
  }
}
