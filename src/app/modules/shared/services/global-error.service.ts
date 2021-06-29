// Library imports
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService {

  private readonly errorSubject$ = new BehaviorSubject<any>([]);
  errorObservable = this.errorSubject$.asObservable();

  handleError(error: HttpErrorResponse) {
    if (error.error.errors) {
      error.error.errors.forEach((errorElement) => {
        errorElement.message = `${errorElement.message}`;
      });
    } else {
      error.error.errors = [{
        message: error.statusText
      }];
    }
    this.errorSubject$.next([{type: 'error', message: error.error.error}]);
    return error;
  }

  clearError() {
    this.errorSubject$.next(null);
  }
}
