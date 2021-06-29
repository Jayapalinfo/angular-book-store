export interface Notifications {
  type?: string;
  notificationMessages: NotificationMessages[];
}

export interface NotificationMessages {
  code: string;
  message: string;
}
