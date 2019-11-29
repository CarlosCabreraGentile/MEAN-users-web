import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NumberValidatorService {

  constructor() { }

/**
 * Validate length of number
 * @param max
 */
static isNumber(max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    let length;
    if (c.value) {
       length = c.value.toString().length;
    }
    if (c.value && ((isNaN(c.value) && isFinite(c.value)) || length > max)) {
        return { maxlength: true };
    }
    return null;
  };
}

}
