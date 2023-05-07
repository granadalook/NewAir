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

  it('should return null if key not found in localStorage', () => {
    const key = 'test';
    const storedValue = service.get(key);
    expect(storedValue).toBeNull();
  });

  it('should return null if localStorage value is not a valid JSON string', () => {
    const key = 'test';
    localStorage.setItem(key, 'not a JSON string');
    const storedValue = service.get(key);
    expect(storedValue).toBeNull();
  });
  it('should clear all items from localStorage', () => {
    const key1 = 'test-key-1';
    const key2 = 'test-key-2';
    const value1 = { name: 'test-name-1' };
    const value2 = { name: 'test-name-2' };
    service.set(key1, value1);
    service.set(key2, value2);
    service.clear();
    expect(service.get<typeof value1>(key1)).toBeNull();
    expect(service.get<typeof value2>(key2)).toBeNull();
  });

  it('should unsubscribe from clearSubscription', () => {
    spyOn(service.clearSubscription, 'unsubscribe');
    service.stopClearSubscription();
    expect(service.clearSubscription.unsubscribe).toHaveBeenCalled();
  });
});
