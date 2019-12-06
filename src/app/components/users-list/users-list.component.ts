import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../../services/user.service';
import { Users } from '../../models/users.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
users: Users[] = [];
selectedUser: Users;
userToDelete = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe(
      (users: Users[]) => {
        this.users = users;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  createUser() {
    this.router.navigate(['user/create']);
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id)
      .subscribe(
        (user: Users) => {
          console.log(user);
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  onDetailUser(content, user, event) {
    this.selectedUser = user;
    // This function prevent cascade clic function
    event.stopPropagation();
    this.modalService.open(content, { centered: true });
  }

  onEditUser(id: string, event) {
    // This function prevent cascade clic function
    event.stopPropagation();
    this.router.navigate([`user/edit/${id}`]);
  }

  onDelete(content, user, event) {
    this.selectedUser = user;
    // This function prevent cascade clic function
    event.stopPropagation();
    this.modalService.open(content, { centered: true, size: 'sm' });
  }

}
