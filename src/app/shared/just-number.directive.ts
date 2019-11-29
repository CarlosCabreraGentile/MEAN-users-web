import { Directive, ElementRef, HostListener, Input } from '@angular/core';

import * as KEYS from './constants/keys';

const specialsKeys = [
  KEYS.ARROWLEFT,
  KEYS.ARROWUP,
  KEYS.ARROWRIGHT,
  KEYS.ARROWDOWN,
  KEYS.ENTER,
  KEYS.TAB,
  KEYS.BACKSPACE
];

@Directive({
  selector: '[appJustNumber]'
})
export class JustNumberDirective {

  regexStr = '^[0-9]*$';
  private key: string;

  constructor(private el: ElementRef) { }

  @Input() appJustNumber: boolean;

  @HostListener('keydown', ['$event'])
    onKeyDown({ key }: KeyboardEvent) {
      this.key = key;
      const e = <KeyboardEvent> event;
      if (this.appJustNumber) {
      if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
      // Allow: Numpad 0
      (e.code === 'Numpad0') ||
      // Allow: Numpad 1
      (e.code === 'Numpad1') ||
      // Allow: Numpad 2
      (e.code === 'Numpad2') ||
      // Allow: Numpad 3
      (e.code === 'Numpad3') ||
      // Allow: Numpad 4
      (e.code === 'Numpad4') ||
      // Allow: Numpad 5
      (e.code === 'Numpad5') ||
      // Allow: Numpad 6
      (e.code === 'Numpad6') ||
      // Allow: Numpad 7
      (e.code === 'Numpad7') ||
      // Allow: Numpad 8
      (e.code === 'Numpad8') ||
      // Allow: Numpad 9
      (e.code === 'Numpad9') ||
      // Allow: Ctrl+A
      (this.key === 'KeyA' && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (this.key === 'KeyC' && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (this.key === 'KeyV' && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (this.key === 'KeyX' && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      let ch = String.fromCharCode(e.keyCode);
      let regEx =  new RegExp(this.regexStr);
      if (regEx.test(ch)) {
        return;
      } else {
        e.preventDefault();
      }
    }
  }

}
