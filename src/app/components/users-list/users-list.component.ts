import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { Users } from '../../models/users.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
users: Users[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe(
      (users: Users[]) => {
        this.users = users;
        console.log(users);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  createPlayer() {
    this.router.navigate(['user/create']);
  }

  detailUser(id: string) {
    console.log(id);
  }

  editUser(id: string) {
    console.log(id);
  }

}
