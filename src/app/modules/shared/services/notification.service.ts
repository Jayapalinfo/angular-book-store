//Library imports
import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {NavigationStart, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private subject: Subject<any>;
  private keepAfterRouteChange: boolean;

  constructor(private router: Router) {

    this.subject = new Subject<any>();
    this.keepAfterRouteChange = false;
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

  /**
   * Get the message if any
   */
  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  /**
   * Set the success message
   * @param message actual message
   * @param keepAfterRouteChange flag to keep message
   */
  success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({type: 'success', text: message});
  }

  /**
   * Set error message
   * @param message actual message
   * @param keepAfterRouteChange flag to keep message
   */
  error(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({type: 'error', text: message});
  }

  /**
   * Clear the notifications
   */
  clear() {
    this.subject.next();
  }

}
