import { Component, OnInit, ElementRef  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { NumberValidatorService } from '../../services/number-validator.service';
import { Users } from '../../models/users.interface';
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
  cancelButton = false;

  /**
   * allow the number 0 to be valid by itself
   * but still invalid when in front of other numbers
   * (example: 0 is valid, but 023 is invalid)
   */
  regex = /^([+-]?[1-9]\d*|0)$/;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private el: ElementRef
  ) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    // If there is an id, get specific player
    if (this.id) {
      this.cancelButton = true;
      this.userService.getUser(this.id).subscribe(
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
      position: [
        this.user.position || '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10)
        ])
      ],
      office: [
        this.user.office || '',
        Validators.compose([Validators.required, Validators.maxLength(20)])
      ],
      salary: [
        this.user.salary || '',
        Validators.compose([Validators.required, Validators.pattern(this.regex), NumberValidatorService.isNumber(6)])
      ],
      email: [
        this.user.email || '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.maxLength(10)
        ])
      ],
      firstName: [
        this.user.firstName || '',
        Validators.compose([Validators.required, Validators.maxLength(10)])
      ],
      lastName: [
        this.user.lastName || '',
        Validators.compose([Validators.required, Validators.maxLength(10)])
      ]
    });
    // console.log(this.form);
  }

  getForm() {
   console.log(this.form.get('position'));
  }

  /**
   * Return true if error message should be displayed
   * @param controlName
   */
  isDisplayError(controlName: string, controlError: string = null) {
    if (this.form.controls[controlName].errors &&
        ((this.form.controls[controlName].touched)
          ||
         (this.form.controls[controlName].dirty))
    ) {
      if (this.form.controls[controlName].getError(controlError)) {
        return true;
      }
    }
  }

  /**
   * Cancel action and redirect to home
   */
  onCancel() {
    this.router.navigate(['home']);
  }

  /**
   * Submit the form with player info
   * @returns {void}
   */
  onSave(): void {
    // If there is not an id, create a new player
    if (!this.id) {
      this.createUser()
      .subscribe(
        (data: any) => {
          this.form.reset();
          this.router.navigate(['home']);
        },
        (err: any) => {
          console.log(err);
        }
        );
    } else {
      // If a there is an id, edit user
      this.editUser()
      .subscribe(() => {
          this.form.reset();
          this.router.navigate(['home']);
        },
        (err: any) => {
          console.log(err);
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
      .subscribe((data) => {
        subject.next(data);
        this.toastrService.success('User Saved');
        console.log(data);
        },
        error => subject.error(error),
        () => subject.complete()
    );
    return subject.asObservable();
  }

  /**
   * Edit user
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

  resetForm(form: FormGroup = null) {
    if (form) {
     this.form.reset();
    }
  }

}
