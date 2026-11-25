import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { Pagination } from '../../../../core/components/Pagination';
import { useRoomsController } from '../hooks/useRoomsController';
import { RoomForm } from '../components/RoomForm';
import { RoomList } from '../components/RoomList';
import './RoomsPage.css';

export function RoomsPage() {
  const { t } = useTranslation();
  const { state, page, goToPage, refetch, createRoom, updateRoom, deleteRoom } = useRoomsController();

  const handleDelete = (id: number) => {
    if (window.confirm(t('rooms.deleteConfirm'))) {
      deleteRoom.sendData({ id });
    }
  };

  return (
    <div className="dashboard-page">
      <PageHeader title={t('rooms.title')} subtitle={t('rooms.subtitle')} />

      <div className="dashboard-card">
        <h3 className="rooms-section-title">{t('rooms.addRoom')}</h3>
        <RoomForm
          submitLabel={t('rooms.addRoomButton')}
          onSubmit={(name) => createRoom.sendData({ name })}
          isSubmitting={createRoom.isSubmitting}
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
        onSuccess={(result) => (
          <>
            <div className="dashboard-card">
              <h3 className="rooms-section-title">{t('rooms.roomList')}</h3>
              <RoomList
                rooms={result.data}
                isDeleting={deleteRoom.isSubmitting}
                isUpdating={updateRoom.isSubmitting}
                onUpdate={(room) => updateRoom.sendData({ id: room.id, name: room.name })}
                onDelete={handleDelete}
              />
            </div>
            <Pagination
              currentPage={result.current_page}
              lastPage={result.last_page}
              onChange={goToPage}
            />
          </>
        )}
      />
    </div>
  );
}
