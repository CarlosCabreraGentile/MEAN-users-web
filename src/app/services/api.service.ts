import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HelperService } from './helper.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

private baseUrl: string;

constructor(private http: HttpClient) {
  this.baseUrl = environment.api.baseUrl;
}

/**
 * HTTP Get
 * @param res
 * @returns {Observable<R>}
 */
httpGet(endpoint: string) {

    // Add timestamp to avoid cache
    if (endpoint.indexOf('?') >= 0) {
        endpoint += '&';
    } else {
        endpoint += '?';
    }
    const timestamp = + new Date();
    endpoint += '_t=' + timestamp;

    return this.http
      .get(this.baseUrl + endpoint, { headers: HelperService.getHttpHeaders() })
        .pipe(
          map(res => res),
          catchError(this.handleError)
        );
}

/**
 * HTTP Post
 * @param endpoint
 * @param dataPost
 * @returns {Observable<R>}
 */
httpPost(endpoint, dataPost, uploadFile = false): Observable<any> {
  let json = null;

  if (dataPost) {
    json = JSON.stringify(dataPost);
  }

  return this.http.post(this.baseUrl + endpoint, json, { headers: HelperService.getHttpHeaders() })
    .pipe(
      map(res => res),
      catchError(this.handleError)
    );
}

/**
 * HTTP Put
 * @param endpoint
 * @param dataPost
 * @returns {Observable<R>}
 */
httpPut(endpoint, dataPost, uploadFile: boolean = false): Observable<any> {
  let json = null;

  if (dataPost) {
    json = JSON.stringify(dataPost);
  }
// return this.http.put(this.baseUrl + endpoint, json, { "headers": new Headers({ "Content-Type": "application/json" }) })
  return this.http.put(this.baseUrl + endpoint, json, { headers: HelperService.getHttpHeaders() })
    .pipe(
      map(res => res),
      catchError(this.handleError)
    );
}

/**
 * HTTP Delete
 * @param endpoint
 * @param dataPost
 * @returns {Observable<R>}
 */
httpDelete(endpoint, uploadFile: boolean = false): Observable<any> {

  return this.http.delete(this.baseUrl + endpoint, { headers: HelperService.getHttpHeaders() })
    .pipe(
      map(res => res),
      catchError(this.handleError)
    );
}

/**
 * Handle error
 * @param error
 * @returns {any}
 */
private handleError(error: any) {
  return throwError(error || 'Server error');
  }
}
