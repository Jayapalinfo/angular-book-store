// Library imports
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

// Local imports
import {NotificationService} from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [NotificationService]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear notifications', () => {
    service.clear();
  });

  it('should display notifications', () => {
    const  notifications = [{
      type: 'error',
      notificationsMessages: [{
        code: '500',
        message: 'Server error'
      }]
    }];
    service.displayNotifications(notifications);
  });
});
