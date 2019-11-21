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
    const headers = new HttpHeaders();

    if (!uploadFile) {
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
    }
    return headers;
  }

}
