// Library imports
import {Component} from '@angular/core';

// Local imports
import {NotificationService} from '../../services';
import {GlobalErrorService} from '../../services/global-error.service';
import {Notifications} from '../../interface/notifications';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  notifications: Notifications[] = [];

  constructor(private readonly notificationService: NotificationService, private readonly globalErrorService: GlobalErrorService) {
    this.globalErrorService.errorObservable.subscribe(errors => {
      this.notifications = errors;
    });
    this.notificationService.notificationObservable.subscribe(errors => {
      this.notifications = errors;
    });
  }
}

