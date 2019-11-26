import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

/**
 * Create http headers object
 * @mockapi boolean If true, then dont add token since it fails
 * @returns {Headers}
 */
  static getHttpHeaders(uploadFile: boolean = false): HttpHeaders {

    // option 1
    // headers = headers.set('Accept', 'application/json').set('Content-Type','application/json');

    //option 2
    const headers = new HttpHeaders( {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    } );

    return headers;
  }

}
