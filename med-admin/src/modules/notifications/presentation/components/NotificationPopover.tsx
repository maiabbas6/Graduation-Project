import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotificationsController } from '../hooks/useNotificationsController';
import './NotificationPopover.css';

interface NotificationPopoverProps {
    isOpen: boolean;
    onClose: () => void;
}

const timeAgo = (dateStr: string): string => {
    const now = new Date();
    const date = new Date(dateStr);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
};

export function NotificationPopover({ isOpen, onClose }: NotificationPopoverProps) {
    const { t } = useTranslation();
    const { state, refetch, unreadCount } = useNotificationsController();
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        refetch();
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose, refetch]);

    if (!isOpen) return null;

    return (
        <div className="notification-popover" ref={popoverRef}>
            <div className="notification-popover-header">
                <h4>{t('header.notifications')}</h4>
                {unreadCount > 0 && <span className="notification-unread-badge">{unreadCount}</span>}
            </div>
            <div className="notification-popover-body">
                {state.isLoading && <p className="notification-loading">{t('common.loading')}</p>}
                {state.isError && <p className="notification-empty">{t('common.unknownError')}</p>}
                {state.isSuccess && state.data && (
                    (!state.data || state.data.length === 0) ? (
                        <p className="notification-empty">{t('notifications.noNotifications')}</p>
                    ) : (
                        <ul className="notification-list">
                            {state.data.map((notification) => (
                                <li key={notification.id} className={`notification-item${notification.read_at === null ? ' unread' : ''}`}>
                                    <strong className="notification-title">{notification.title}</strong>
                                    <p className="notification-body">{notification.body}</p>
                                    <span className="notification-time">{timeAgo(notification.created_at)}</span>
                                </li>
                            ))}
                        </ul>
                    )
                )}
            </div>
        </div>
    );
}
