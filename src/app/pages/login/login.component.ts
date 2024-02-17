import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActions } from 'store/auth';
import { LoginService } from './login.service';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { NotificationService } from 'core/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from 'utils/localStorage';
import { Router } from '@angular/router';

interface LoginPayload {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private store: Store, private fb: NonNullableFormBuilder) {}

  validator: FormGroup<LoginPayload> = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required]],
  });

  $loginHandler = inject(LoginService).loginHook();
  $notificationService = inject(NotificationService);
  $navigator = inject(Router);

  ngOnInit(): void {
    const token = getTokenFromLocalStorage();
    if (token) {
      console.log('go');
      this.$navigator.navigate(['../home']);
    }
  }

  submitForm(): void {
    if (this.validator.valid) {
      const { username, password } = this.validator.value;
      if (username && password) {
        this.$loginHandler.result$.subscribe();
        this.$loginHandler.mutate(
          { username, password },
          {
            onSuccess: (res) => {
              this.store.dispatch(authActions.addUser({ user: res }));
              setTokenToLocalStorage(res.token);
              this.$navigator.navigate(['../home']);
            },
            onError: (err) => {
              if (err instanceof HttpErrorResponse) {
                this.$notificationService.createMessage(
                  'error',
                  err.error.message
                );
              }
            },
          }
        );
      }
    } else {
      Object.values(this.validator.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
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
