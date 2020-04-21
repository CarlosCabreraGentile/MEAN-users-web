import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  static getHttpHeaders(uploadFile: boolean = false): HttpHeaders {

    // option 1
    // headers = headers.set('Accept', 'application/json').set('Content-Type','application/json');

    // option 2
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return headers;
  }

}
