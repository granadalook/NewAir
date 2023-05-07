import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  getUniques<T>(items: Array<T>): Array<T> {
    return items.filter((element, index) => {
      return items.indexOf(element) === index;
    });
  }
  removeUndefineds<T>(arrays: Array<T>): Array<T> {
    return arrays.filter((res) => res != undefined);
  }
}
