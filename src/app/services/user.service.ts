import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Subject, Observable } from 'rxjs';
import { Users } from '../models/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  /**
   * Get users from API
   * @returns {Observable<Users>}
   */
  public getUsers(): Observable<Users[]> {
    const subject = new Subject<any>();
    this.apiService.httpGet('/user')
    // Create a subscribe because you can manipulate the data, otherwise its not necessary to subscribe
      .subscribe(
        (data: any) => {
          subject.next(data);
        },
        (err: any) => {
          subject.error(err);
        },
        () => {
          subject.complete();
        }
      );

    return subject.asObservable();
  }

  public getUser(id: string): Observable<Users> {
    return this.apiService.httpGet(`/user/${id}`);
  }

  public postUser(user: Users): Observable<Users> {
    return this.apiService.httpPost('/user', user);
  }

  public putUser(id: string, user: Users): Observable<Users> {
    return this.apiService.httpPut(`/user/${id}`, user);
  }

  public deleteUser(id: string): Observable<Users> {
    return this.apiService.httpDelete(`/user/${id}`);
  }

}
