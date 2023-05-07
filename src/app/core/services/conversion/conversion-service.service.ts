import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ConversionService {
  constructor(private http: HttpClient) {}

  convertCurrency(to: string, from: string, amount: number): Observable<any> {
    const apiUrl = `${environment.API_COMVERT_URL}to=${to}&from=${from}&amount=${amount}`;
    const headers = new HttpHeaders().set('apiKey', ` ${environment.API_KEY}`);
    return this.http.get(apiUrl, { headers });
  }
}
