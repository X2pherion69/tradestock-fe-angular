import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUser } from 'store/auth';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}
  token: string | undefined = undefined;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store.select(getUser).subscribe((user) => (this.token = user?.token));
    const configHeaders = {
      Accept: 'application/json',
      Authorization: '',
    };
    console.log(this.token);
    if (this.token) {
      configHeaders['Authorization'] = 'asdasdasdasdasdasd';
      req = req.clone({
        setHeaders: configHeaders,
      });
      return next.handle(req);
    }
    return next.handle(req);
  }
}
