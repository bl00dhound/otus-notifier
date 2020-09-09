import db from '../providers/db';
import INotification, { INotificationData } from '../interfaces/INotification';

export default class NotificationDAO {
  static async createNotification(notification: INotificationData): Promise<INotification> {
    return db('user_notifications')
      .insert(notification)
      .returning('*')
      .then((data) => data[0]);
  }
}
