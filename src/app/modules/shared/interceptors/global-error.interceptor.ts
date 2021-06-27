import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthenticationService} from "../services";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.authenticationService.logout();
        location.reload(true);
      }
      const error = err.error.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
