import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { useNotificationsController } from '../hooks/useNotificationsController';
import './NotificationsPage.css';

const timeAgo = (dateStr: string): string => {
    const now = new Date();
    const date = new Date(dateStr);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
};

const formatDateTime = (dateStr: string): string => {
    return new Date(dateStr).toLocaleString();
};

export function NotificationsPage() {
    const { t } = useTranslation();
    const { state, refetch } = useNotificationsController();

    return (
        <div className="dashboard-page">
            <PageHeader title={t('notifications.title')} subtitle={t('notifications.subtitle')} />

            <StatusComponent
                state={state}
                onError={(message) => (
                    <div className="dashboard-card dashboard-error">
                        <p>{message}</p>
                        <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
                    </div>
                )}
                onSuccess={(notifications) => (
                    <div className="dashboard-card">
                        {!notifications || notifications.length === 0 ? (
                            <p className="list-empty">{t('notifications.noNotifications')}</p>
                        ) : (
                            <ul className="notification-page-list">
                                {notifications.map((notification) => (
                                    <li key={notification.id} className={`notification-page-item${notification.read_at === null ? ' unread' : ''}`}>
                                        <div className="notification-page-header">
                                            <strong className="notification-page-title">{notification.title}</strong>
                                            <span className="notification-page-time">{timeAgo(notification.created_at)}</span>
                                        </div>
                                        <p className="notification-page-body">{notification.body}</p>
                                        <span className="notification-page-datetime">{formatDateTime(notification.created_at)}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            />
        </div>
    );
}
