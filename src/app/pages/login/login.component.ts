import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActions, getUser } from 'store/auth';
import { User } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private store: Store) {}
  $user = this.store.select(getUser);
  user: User | null = null;
  ngOnInit(): void {
    this.store.dispatch(
      authActions.addUser({
        user: {
          id: 1,
          email: 'foo@bar.com',
          firstName: 'asd',
          gender: 'asd',
          image: 'asd',
          lastName: 'asd',
          token: 'asd',
          username: 'asd',
        },
      })
    );
    this.$user.subscribe((data) => (this.user = data));
  }

  onChangeUser() {
    this.store.dispatch(
      authActions.addUser({
        user: {
          id: 2,
          email: 'foo@barasd.com',
          firstName: 'asdasdasd',
          gender: 'asdasdasd',
          image: 'asdasdasd',
          lastName: 'asdasdasd',
          token: 'asdasdasd',
          username: 'asdasdsad',
        },
      })
    );
  }

  onResetUser() {
    this.store.dispatch(authActions.resetAuth());
  }
}
