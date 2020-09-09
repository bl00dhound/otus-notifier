import { Events } from '../constants';

export interface INotificationData {
  created_at?: Date;
  event: Events;
  user_id: number;
  message: string;
}

interface INotification extends INotificationData {
  id: number;
}

export default INotification;
