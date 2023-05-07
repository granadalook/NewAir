import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCardComponent } from './flight-card.component';
import { CurrencyService } from 'src/app/core/services/currency/currency.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IJourney } from 'src/app/models/journey.model';
import { of } from 'rxjs';

describe('FlightCardComponent', () => {
  let component: FlightCardComponent;
  let fixture: ComponentFixture<FlightCardComponent>;
  let currencyService: CurrencyService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightCardComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [CurrencyService],
    }).compileComponents();

    currencyService = TestBed.inject(CurrencyService);
    fixture = TestBed.createComponent(FlightCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set formatprice value whit the input journeyprice when running NgOnInit', () => {
    const journey: IJourney = {
      flights: [],
      origin: 'testOrigin',
      destination: 'testDestination',
      price: 100,
    };

    component.journey = journey;
    component.ngOnInit();
    expect(component.formatePrice).toEqual(journey.price);
    expect(component.currencies.length).toBeGreaterThan(0);
  });

  it('should convert journey price to specified currency', () => {
    const journey: IJourney = {
      flights: [],
      origin: 'testOrigin',
      destination: 'testDestination',
      price: 100,
    };
    const to = 'USD';
    const expected = 80;
    spyOn(currencyService, 'convert').and.returnValue(of({ result: expected }));

    component.convert(journey, to);

    expect(currencyService.convert).toHaveBeenCalledWith(
      to,
      component.from,
      journey.price
    );
    expect(component.formatePrice).toEqual(expected);
  });
});
