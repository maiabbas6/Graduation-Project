import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { StatusBadge, type BadgeStatus } from '../../../../core/components/StatusBadge';
import type { RoomServiceUserStatus } from '../../../../core/models/RoomServiceUserModel';
import { useRoomServiceUserDetailController } from '../hooks/useRoomServiceUserDetailController';
import './RoomServiceUserDetailPage.css';

const STATUS_BADGE: Record<RoomServiceUserStatus, BadgeStatus> = {
  waiting: 'pending',
  done: 'completed',
  canceled: 'high',
};

export function RoomServiceUserDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const itemId = Number(id);
  const { state, refetch } = useRoomServiceUserDetailController(itemId);

  return (
    <div className="dashboard-page">
      <PageHeader title={t('roomServiceUsers.roomServiceUserDetail')} subtitle={t('roomServiceUsers.roomServiceUserDetails')} />

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(item) => (
          <div className="dashboard-card">
            <h2 className="room-service-user-detail-title">
              {item.room_service?.name ?? `Room service user #${item.id}`}
              {item.status && <StatusBadge status={STATUS_BADGE[item.status]} label={item.status} />}
            </h2>
            <dl className="room-service-user-detail-list">
              <div className="detail-item"><dt>{t('common.id')}</dt><dd>#{item.id}</dd></div>
              <div className="detail-item"><dt>{t('roomServiceUsers.roomService')}</dt><dd>{item.room_service?.name ?? '—'}</dd></div>
              <div className="detail-item"><dt>{t('roomServiceUsers.room')}</dt><dd>{item.room?.name ?? '—'}</dd></div>
              <div className="detail-item"><dt>{t('roomServiceUsers.user')}</dt><dd>
                {item.user?.first_name ? `${item.user.first_name} ${item.user.last_name ?? ''}` : '—'}
              </dd></div>
              <div className="detail-item"><dt>{t('roomServiceUsers.employee')}</dt><dd>
                {item.employee?.user?.first_name ? `${item.employee.user.first_name} ${item.employee.user.last_name ?? ''}` : '—'}
              </dd></div>
            </dl>
          </div>
        )}
      />
    </div>
  );
}
