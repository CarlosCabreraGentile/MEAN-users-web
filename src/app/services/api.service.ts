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

httpGet(endpoint: string): Observable<any> {

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

httpDelete(endpoint, uploadFile: boolean = false): Observable<any> {
  return this.http.delete(this.baseUrl + endpoint, { headers: HelperService.getHttpHeaders() })
    .pipe(
      map(res => res),
      catchError(this.handleError)
    );
}

private handleError(error: any) {
  return throwError(error || 'Server error');
  }
}
