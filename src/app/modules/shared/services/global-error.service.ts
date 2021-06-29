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
      this.errorSubject$.next([{type: 'error', notificationMessages: error.error.errors}]);
    } else {
      this.errorSubject$.next([{type: 'error', notificationMessages: [{code: error.status, message: error.statusText}]}]);
    }
    return error;
  }

  clearError() {
    this.errorSubject$.next(null);
  }
}
