import { TestBed } from '@angular/core/testing';

import { NumberValidatorService } from './number-validator.service';

describe('NumberValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NumberValidatorService = TestBed.get(NumberValidatorService);
    expect(service).toBeTruthy();
  });
});
