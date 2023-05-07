import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './currency.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environments';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService],
    });
    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return an array of currencies', () => {
    const currencies = service.get();
    expect(currencies.length).toBeGreaterThan(0);
  });
  it('should convert currencies', () => {
    const to = 'USD';
    const from = 'EUR';
    const amount = 100;
    const expectedConversion = { result: 120.36 };
    service.convert(to, from, amount).subscribe((data) => {
      expect(data).toEqual(expectedConversion);
    });
    const req = httpMock.expectOne(
      `${environment.API_COMVERT_URL}to=${to}&from=${from}&amount=${amount}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(expectedConversion);
  });
});
