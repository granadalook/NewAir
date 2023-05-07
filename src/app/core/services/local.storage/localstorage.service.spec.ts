import { TestBed } from '@angular/core/testing';

import { LocalstorageService } from './localstorage.service';

describe('LocalstorageService', () => {
  let service: LocalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('should set value in localStorage', () => {
    const key = 'test';
    const value = { message: 'Hello world!' };
    service.set(key, value);
    const storedValue = JSON.parse(localStorage.getItem(key)!);
    expect(storedValue).toEqual(value);
  });

  it('should get value from localStorage', () => {
    const key = 'test';
    const value = { message: 'Hello world!' };
    localStorage.setItem(key, JSON.stringify(value));
    const storedValue = service.get(key);
    expect(storedValue).toEqual(value);
  });

  it('should unsubscribe from clearSubscription', () => {
    spyOn(service.clearSubscription, 'unsubscribe');
    service.stopClearSubscription();
    expect(service.clearSubscription.unsubscribe).toHaveBeenCalled();
  });
});
