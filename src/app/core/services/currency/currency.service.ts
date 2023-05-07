import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurrency } from 'src/app/models/currency.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}
  get(): Array<ICurrency> {
    return [
      { code: 'USD', name: 'Dollar American' },
      { code: 'CLP', name: 'Chile Peso' },
      { code: 'CNY', name: 'China Yuan Renminbi' },
      { code: 'GBP', name: 'United Kingdom Pound' },
      { code: 'COP', name: 'Colombia Peso' },
      { code: 'HKD', name: 'Hong Kong Dollar' },
      { code: 'JPY', name: 'Japan Yen' },
      { code: 'KPW', name: 'Korea (North) Won' },
      { code: 'MXN', name: 'Mexico Peso' },
      { code: 'NZD', name: 'New Zealand Dollar' },
      { code: 'PYG', name: 'Paraguay Guarani' },
      { code: 'PEN', name: 'Peru Sol' },
      { code: 'TRY', name: 'Turkey Lira' },
    ] as Array<ICurrency>;
  }

  convert(to: string, from: string, amount: number): Observable<any> {
    const apiUrl = `${environment.API_COMVERT_URL}to=${to}&from=${from}&amount=${amount}`;
    const headers = new HttpHeaders().set('apiKey', ` ${environment.API_KEY}`);
    return this.http.get(apiUrl, { headers });
  }
}
