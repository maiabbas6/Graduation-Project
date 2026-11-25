import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { useRoomUsersController } from '../hooks/useRoomUsersController';
import { RoomUserForm } from '../components/RoomUserForm';
import { RoomUsersList } from '../components/RoomUsersList';
import './RoomUsersPage.css';

export function RoomUsersPage() {
  const { t } = useTranslation();
  const { state, refetch, users, rooms, createRoomUser, updateRoomUser, deleteRoomUser } = useRoomUsersController();

  const handleDelete = (id: number) => {
    if (window.confirm(t('roomUsers.deleteConfirm'))) {
      deleteRoomUser.sendData({ id });
    }
  };

  return (
    <div className="dashboard-page">
      <PageHeader title={t('roomUsers.title')} subtitle={t('roomUsers.subtitle')} />

      <div className="dashboard-card">
        <h3 className="rooms-section-title">{t('roomUsers.assignUser')}</h3>
        <RoomUserForm
          submitLabel="Assign"
          onSubmit={(userId, roomId) => createRoomUser.sendData({ userId, roomId })}
          isSubmitting={createRoomUser.isSubmitting}
          users={users.state.data ?? null}
          rooms={rooms.state.data ?? null}
          isLoadingUsers={users.isLoading}
          isLoadingRooms={rooms.isLoading}
        />
      </div>

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(roomUsers) => (
          <div className="dashboard-card">
            <h3 className="rooms-section-title">{t('roomUsers.roomUsers')}</h3>
            <RoomUsersList
              roomUsers={roomUsers}
              users={users.state.data ?? null}
              rooms={rooms.state.data ?? null}
              isLoadingUsers={users.isLoading}
              isLoadingRooms={rooms.isLoading}
              isDeleting={deleteRoomUser.isSubmitting}
              isUpdating={updateRoomUser.isSubmitting}
              onUpdate={(id, userId, roomId) => updateRoomUser.sendData({ id, userId, roomId })}
              onDelete={handleDelete}
            />
          </div>
        )}
      />
    </div>
  );
}
