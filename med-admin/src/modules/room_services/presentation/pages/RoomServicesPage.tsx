import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { useRoomServicesController } from '../hooks/useRoomServicesController';
import { RoomServiceForm } from '../components/RoomServiceForm';
import { RoomServicesList } from '../components/RoomServicesList';
import './RoomServicesPage.css';

export function RoomServicesPage() {
  const { t } = useTranslation();
  const { state, refetch, createRoomService, updateRoomService, deleteRoomService } = useRoomServicesController();

  const handleDelete = (id: number) => {
    if (window.confirm(t('roomServices.deleteConfirm'))) {
      deleteRoomService.sendData({ id });
    }
  };

  return (
    <div className="dashboard-page">
      <PageHeader title={t('roomServices.title')} subtitle={t('roomServices.subtitle')} />

      <div className="dashboard-card">
        <h3 className="rooms-section-title">{t('roomServices.addRoomService')}</h3>
        <RoomServiceForm
          submitLabel={t('roomServices.addService')}
          onSubmit={(name, price) => createRoomService.sendData({ name, price })}
          isSubmitting={createRoomService.isSubmitting}
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
        onSuccess={(services) => (
          <div className="dashboard-card">
            <h3 className="rooms-section-title">{t('roomServices.roomServices')}</h3>
            <RoomServicesList
              services={services}
              isDeleting={deleteRoomService.isSubmitting}
              isUpdating={updateRoomService.isSubmitting}
              onUpdate={(id, name, price) => updateRoomService.sendData({ id, name, price })}
              onDelete={handleDelete}
            />
          </div>
        )}
      />
    </div>
  );
}
