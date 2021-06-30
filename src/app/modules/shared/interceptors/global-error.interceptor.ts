// Library imports
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

// Local imports
import {AuthenticationService} from '../services';
import {GlobalErrorService} from '../services/global-error.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorInterceptor {

  constructor(private readonly authenticationService: AuthenticationService, private readonly globalErrorService: GlobalErrorService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.globalErrorService.clearError();
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.authenticationService.logout();
        location.reload();
      } else {
        this.globalErrorService.handleError(error);
        return throwError(error);
      }
    }));
  }
}
