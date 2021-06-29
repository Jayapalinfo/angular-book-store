// Library imports
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly notificationSubject$ = new BehaviorSubject<any>([]);
  notificationObservable = this.notificationSubject$.asObservable();

  /**
   * Display notifications
   * @param notifications notifications
   */
  displayNotifications(notifications) {
    this.notificationSubject$.next(notifications);
  }

  /**
   * Clear the notifications
   */
  clear() {
    this.notificationSubject$.next([]);
  }

}
