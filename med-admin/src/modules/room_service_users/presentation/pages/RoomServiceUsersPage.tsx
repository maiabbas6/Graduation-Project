import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { useRoomServiceUsersController } from '../hooks/useRoomServiceUsersController';
import { RoomServiceUsersList } from '../components/RoomServiceUsersList';
import './RoomServiceUsersPage.css';

export function RoomServiceUsersPage() {
  const { t } = useTranslation();
  const {
    state,
    refetch,
    deleteRoomServiceUser,
    changeStatus,
  } = useRoomServiceUsersController();

  const handleDelete = (id: number) => {
    if (window.confirm(t('roomServiceUsers.deleteConfirm'))) {
      deleteRoomServiceUser.sendData({ id });
    }
  };

  return (
    <div className="dashboard-page">
      <PageHeader title={t('roomServiceUsers.title')} subtitle={t('roomServiceUsers.subtitle')} />

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(items) => (
          <div className="dashboard-card">
            <h3 className="rooms-section-title">{t('roomServiceUsers.roomServiceUsers')}</h3>
            <RoomServiceUsersList
              items={items}
              isDeleting={deleteRoomServiceUser.isSubmitting}
              isChangingStatus={changeStatus.isSubmitting}
              onDelete={handleDelete}
              onStatusChange={(id, status) => changeStatus.sendData({ id, status })}
            />
          </div>
        )}
      />
    </div>
  );
}
