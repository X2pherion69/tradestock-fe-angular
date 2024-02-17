import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { injectMutation } from '@ngneat/query';

interface LoginPayload {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  #http = inject(HttpClient);
  #mutation = injectMutation();

  loginHook() {
    return this.#mutation({
      mutationFn: (data: LoginPayload) =>
        this.#http.post<User>('https://dummyjson.com/auth/login', data),
    });
  }
}
