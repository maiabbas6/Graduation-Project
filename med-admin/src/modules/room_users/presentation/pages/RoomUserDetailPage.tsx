import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { useRoomUserDetailController } from '../hooks/useRoomUserDetailController';
import './RoomUserDetailPage.css';

const formatDate = (value: string | null): string => {
  if (!value) return '—';
  const date = new Date(value);
  return date.toLocaleString();
};

export function RoomUserDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const roomUserId = Number(id);
  const { state, refetch } = useRoomUserDetailController(roomUserId);

  return (
    <div className="dashboard-page">
      <PageHeader title={t('roomUsers.roomUserDetail')} subtitle={t('roomUsers.roomUserDetails')} />

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(roomUser) => (
          <div className="dashboard-card">
            <h2>{roomUser.user?.first_name ? `${roomUser.user.first_name} ${roomUser.user.last_name ?? ''}` : `User #${roomUser.user_id}`}</h2>
            <dl className="room-user-detail-list">
              <div className="detail-item"><dt>{t('common.id')}</dt><dd>#{roomUser.id}</dd></div>
              <div className="detail-item"><dt>{t('roomUsers.room')}</dt><dd>{roomUser.room?.name ?? `Room #${roomUser.room_id}`}</dd></div>
              <div className="detail-item"><dt>{t('roomUsers.user')}</dt><dd>#{roomUser.user_id}</dd></div>
              <div className="detail-item"><dt>{t('roomUsers.joinedAt')}</dt><dd>{formatDate(roomUser.created_at)}</dd></div>
              <div className="detail-item"><dt>{t('roomUsers.leftAt')}</dt><dd>{formatDate(roomUser.left_at)}</dd></div>
            </dl>
          </div>
        )}
      />
    </div>
  );
}
