import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NumberValidatorService {

  constructor() { }


/**
 * Validate if number (integer or double)
 * @param control
 */
// static isNumber(maxLength: number): any {
//   if (c.) {
//     debugger
//       if (!(!isNaN(parseFloat(control.value)) && isFinite(control.value))) {
//         return {number: {valid: false}};
//       }
//   }
//   return null;
// }

/**
 * Validate length of number
 * @param max
 */
static isNumber(max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    let length = c.value.toString().length;
      if (c.value && ((isNaN(c.value) && isFinite(c.value)) || length > max)) {
          return { 'maxlength': true };
      }
      return null;
  };
}

}
