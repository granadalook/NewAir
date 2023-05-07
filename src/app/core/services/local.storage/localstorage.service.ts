import { Injectable } from '@angular/core';
import { Subscription, tap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  public clearSubscription: Subscription;

  constructor() {
    this.clearSubscription = timer(0, 24 * 60 * 60 * 1000)
      .pipe(
        tap(() => {
          this.clear();
        })
      )
      .subscribe();
  }

  set(key: string, value: any): void {
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null {
    const objetString = localStorage.getItem(key);
    return objetString ? (JSON.parse(objetString) as T) : null;
  }

  clear() {
    window.localStorage.clear();
  }

  stopClearSubscription() {
    this.clearSubscription.unsubscribe();
  }
}
