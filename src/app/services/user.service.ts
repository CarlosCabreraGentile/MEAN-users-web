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

  /**
   * Get a specific users from API
   * @returns {Observable<Users>}
   */
  public getUser(id: string): Observable<Users> {
    const subject = new Subject<any>();
    this.apiService.httpGet(`/user/${id}`)
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

  /**
   * Create a new user
   * @returns {Observable<Users>}
   */
  public postUser(user: Users): Observable<Users> {
    const subject = new Subject<any>();
    this.apiService.httpPost('/user', user)
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

  /**
   * Edit user info
   * @param id id from user
   * @param user
   * @returns {Observable<Users>}
   */
  public putUser(id: string, user: Users): Observable<Users> {
    const subject = new Subject<any>();

    this.apiService.httpPut(`/user/${id}`, user)
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

  /**
   * Delete user info
   * @param id id from user
   * @param user
   * @returns {Observable<Users>}
   */
  public deleteUser(id: string): Observable<Users> {
    const subject = new Subject<any>();

    this.apiService.httpDelete(`/user/${id}`)
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

}
