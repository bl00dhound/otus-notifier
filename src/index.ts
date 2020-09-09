import bus from './providers/bus';
import logger from './providers/logger';
import { checkConnection } from './providers/db';
import { NotificationService } from './services';
import { Events } from './constants';

process.on('uncaughtException', (err) => {
  logger.fatal('[Notifications Worker fatal error]: ', {
    error: err.message,
    stack: err.stack,
  });
});

checkConnection();

Promise.all([
  bus.subscribe(Events.CREATE_USER, 'notification', NotificationService.createUser.bind(this, Events.CREATE_USER)),
  bus.subscribe(Events.CREATE_ORDER, 'notification', NotificationService.createOrder.bind(this, Events.CREATE_ORDER)),
  bus.subscribe(Events.BILLING_SUCCESS, 'notification', NotificationService.billingSuccess.bind(this, Events.BILLING_SUCCESS)),
  bus.subscribe(Events.BILLING_FAILED, 'notification', NotificationService.billingFailed.bind(this, Events.BILLING_FAILED)),
]);
