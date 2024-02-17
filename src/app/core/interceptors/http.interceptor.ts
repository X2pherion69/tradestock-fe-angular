import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getTokenFromLocalStorage } from 'utils/localStorage';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const configHeaders = {
      Accept: 'application/json',
      Authorization: '',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
    const token = getTokenFromLocalStorage();
    if (token) {
      configHeaders['Authorization'] = token;
      req = req.clone({
        setHeaders: configHeaders,
        // withCredentials: true,
      });
      return next.handle(req);
    }
    return next.handle(req);
  }
}
