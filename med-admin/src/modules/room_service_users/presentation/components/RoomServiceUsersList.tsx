import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StatusBadge, type BadgeStatus } from '../../../../core/components/StatusBadge';
import type { RoomServiceUserModel, RoomServiceUserStatus } from '../../../../core/models/RoomServiceUserModel';

interface RoomServiceUsersListProps {
  items: RoomServiceUserModel[];
  isDeleting: boolean;
  isChangingStatus: boolean;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: RoomServiceUserStatus) => void;
}

const STATUS_BADGE: Record<RoomServiceUserStatus, BadgeStatus> = {
  waiting: 'pending',
  done: 'completed',
  canceled: 'high',
};

const serviceLabel = (item: RoomServiceUserModel): string => item.room_service?.name ?? '—';
const roomLabel = (item: RoomServiceUserModel): string => item.room?.name ?? '—';
const userLabel = (item: RoomServiceUserModel): string => {
  if (item.user?.first_name) {
    return `${item.user.first_name} ${item.user.last_name ?? ''}`.trim();
  }
  return '—';
};
const employeeLabel = (item: RoomServiceUserModel): string => {
  if (item.employee?.user?.first_name) {
    return `${item.employee.user.first_name} ${item.employee.user.last_name ?? ''}`.trim();
  }
  return '—';
};

export function RoomServiceUsersList({
  items,
  isDeleting,
  isChangingStatus,
  onDelete,
  onStatusChange,
}: RoomServiceUsersListProps) {
  const { t } = useTranslation();

  const STATUS_OPTIONS: { value: RoomServiceUserStatus; label: string }[] = [
    { value: 'waiting', label: t('roomServiceUsers.waiting') },
    { value: 'done', label: t('roomServiceUsers.done') },
    { value: 'canceled', label: t('roomServiceUsers.canceled') },
  ];

  if (!items || items.length === 0) {
    return <p className="list-empty">{t('roomServiceUsers.noRoomServiceUsers')}</p>;
  }

  return (
    <ul className="room-list">
      {items.map((item) => (
        <li key={item.id} className="room-service-user-row">
          <div className="room-service-user-main">
            <div className="room-service-user-head">
              {item.status ? (
                <StatusBadge status={STATUS_BADGE[item.status]} label={item.status} />
              ) : (
                <span className="room-service-user-no-status">{t('common.none')}</span>
              )}
              <strong className="room-name">{serviceLabel(item)}</strong>
            </div>
            <div className="room-service-user-meta">
              <span>{roomLabel(item)}</span>
              <span>{userLabel(item)}</span>
              <span>{employeeLabel(item)}</span>
            </div>
          </div>
          <div className="room-actions">
            <select
              className="room-service-user-status"
              value={item.status ?? ''}
              onChange={(event) => onStatusChange(item.id, event.target.value as RoomServiceUserStatus)}
              disabled={isChangingStatus}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <Link className="room-btn room-btn-edit" to={`/room-service-users/${item.id}`}>{t('common.view')}</Link>
            <button
              type="button"
              className="room-btn room-btn-delete"
              onClick={() => onDelete(item.id)}
              disabled={isDeleting}
            >
              {t('common.delete')}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
