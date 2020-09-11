import logger from '../providers/logger';
import IUser from '../interfaces/IUser';
import ICreateOrder from '../interfaces/ICreateOrder';
import IBalance from '../interfaces/IBalance';
import { Events } from '../constants';
import { NotificationDAO } from '../dao';

export default class NotificationService {
  static async createUser(event: Events, user: IUser): Promise<boolean> {
    try {
      const result = await NotificationDAO.createNotification({
        event,
        user_id: user.id,
        message: `Welcome, ${user.firstName}!`,
      });
      logger.info(result, '[createUser]: ');
      return true;
    } catch (err) {
      logger.error({
        message: err.message,
        stack: err.stack,
      }, '[CreateUser notification error]: ');
    }
    return false;
  }

  static async createOrder(event: Events, orderData: ICreateOrder): Promise<boolean> {
    try {
      const result = await NotificationDAO.createNotification({
        event,
        user_id: orderData.user_id,
        message: `Order #${orderData.id} was placed.`,
      });
      logger.info(result, '[createOrder]: ');
      return true;
    } catch (err) {
      logger.error({
        message: err.message,
        stack: err.stack,
      }, '[CreateOrder notification error]: ');
    }
    return false;
  }

  static async billingSuccess(event: Events, msg: IBalance) {
    try {
      const result = await NotificationDAO.createNotification({
        event,
        user_id: msg.user_id,
        message: `Balance of user #${msg.user_id} was successfully updated: ${msg.balance}`,
      });
      logger.info(result, '[billingSuccess]: ');
      return true;
    } catch (err) {
      logger.error({
        message: err.message,
        stack: err.stack,
      }, '[BillingSuccess notification error]: ');
    }
    return false;
  }

  static async billingFailed(event: Events, msg: IBalance) {
    try {
      const result = await NotificationDAO.createNotification({
        event,
        user_id: msg.user_id,
        message: `Change balance of user #${msg.user_id} was failed. Changes weren't applied.`,
      });
      logger.info(result, '[billingFailed]: ');
      return true;
    } catch (err) {
      logger.error({
        message: err.message,
        stack: err.stack,
      }, '[BillingFailed notification error]: ');
    }
    return false;
  }
}
