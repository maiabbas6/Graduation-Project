import { ApiConst } from '../../../../core/const/ApiConst';
import { networkHelper } from '../../../../core/network/cacheNetworkHelper';
import type { Notification, NotificationsApiResponse } from '../models/NotificationModel';

export class NotificationDataSource {
    async getNotifications(): Promise<Notification[]> {
        const response = await networkHelper.get<NotificationsApiResponse>(ApiConst.notifications);
        return response.data.data;
    }
}

export const notificationDataSource = new NotificationDataSource();
