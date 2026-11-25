import { useLoadData } from '../../../../core/hooks/useLoadData';
import { notificationDataSource } from '../../data/data_source/NotificationDataSource';
import type { Notification } from '../../data/models/NotificationModel';

export function useNotificationsController() {
    const { state, refetch, isLoading, isSuccess, isError } = useLoadData<Notification[]>(
        () => notificationDataSource.getNotifications()
    );

    const unreadCount = isSuccess && state.data
        ? state.data.filter((n) => n.read_at === null).length
        : 0;

    return { state, refetch, unreadCount, isLoading, isSuccess, isError };
}
