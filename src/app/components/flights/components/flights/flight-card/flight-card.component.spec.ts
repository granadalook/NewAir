import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCardComponent } from './flight-card.component';
import { CurrencyService } from 'src/app/core/services/currency/currency.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('FlightCardComponent', () => {
  let component: FlightCardComponent;
  let fixture: ComponentFixture<FlightCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightCardComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [CurrencyService],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
