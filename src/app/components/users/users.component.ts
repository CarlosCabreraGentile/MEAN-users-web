import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { Users } from '../../models/users';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: any = {};
  form: FormGroup;
  id: string = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.id = this.route.snapshot.params.id;
    }

  ngOnInit() {
        // If there is an id, get specific player
        if (this.id) {
          this.userService.getUser(this.id)
            .subscribe(
              (data: Users) => {
                this.user = data;
                this.initForm();
              },
              (err: any) => {
                console.error(err);
              }
            );
        } else {
          // If not, then initialize an empty form
          this.initForm();
    }
  }

  /**
   * Function that initialize the form
   * @returns {void}
   */
  initForm(): void {
    this.form = this.fb.group({
      position: [this.user.position || '', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
      ])],
      office: [this.user.office || '', Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])],
      salary: [this.user.salary || '', Validators.compose([
        Validators.required,
        Validators.maxLength(6)
      ])],
      email: [this.user.email || '', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.maxLength(30),
      ])],
      firstName: [this.user.firstName || '', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
      ])],
      lastName: [this.user.lastName || '', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
      ])],
    });
    console.log(this.form);
  }
getForm() {
  console.log(this.form);

}
  /**
   * Submit the form with player info
   * @returns {void}
   */
  onSave(): void {
    // If there is not an id, create a new player
    if (!this.id) {
      this.createUser()
        .subscribe(() => {
          this.form.reset();
          // this.router.navigate(['home']);
        });
    } else {
      // If a there is an id, edit user
      this.editUser()
        .subscribe(() => {
          this.form.reset();
          // this.router.navigate(['home']);
        });
    }
  }

  /**
   * Create a user
   * @returns {Observable<void>}
   */
  private createUser(): Observable<void> {
    const subject = new Subject<any>();
    this.userService.postUser(this.form.value)
      .subscribe(
        () => subject.next(),
        error => subject.error(error),
        () => subject.complete()
      );
    return subject.asObservable();
  }

  /**
   * Edit player
   * @returns {Observable<void>}
   */
  private editUser(): Observable<void> {
    const subject = new Subject<any>();
    this.userService.putUser(this.id, this.form.value)
      .subscribe(
        () => subject.next(),
        error => subject.error(error),
        () => subject.complete()
      );
    return subject.asObservable();
  }

}
