import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService],
    });
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUniques', () => {
    it('should return an array with unique values', () => {
      const input = [1, 2, 3, 1, 2];
      const expected = [1, 2, 3];

      const result = service.getUniques(input);

      expect(result).toEqual(expected);
    });
  });

  describe('removeUndefineds', () => {
    it('should remove undefined values from an array', () => {
      const input = [1, undefined, 2, undefined, 3];
      const expected = [1, 2, 3];

      const result = service.removeUndefineds(input);

      expect(result).toEqual(expected);
    });
  });
});
