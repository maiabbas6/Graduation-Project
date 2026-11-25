import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { useRoomServiceDetailController } from '../hooks/useRoomServiceDetailController';
import './RoomServiceDetailPage.css';

export function RoomServiceDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const serviceId = Number(id);
  const { state, refetch } = useRoomServiceDetailController(serviceId);

  return (
    <div className="dashboard-page">
      <PageHeader title={t('roomServices.roomServiceDetail')} subtitle={t('roomServices.roomServiceDetails')} />

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(service) => (
          <div className="dashboard-card">
            <h2>{service.name}</h2>
            <dl className="room-service-detail-list">
              <div className="detail-item"><dt>{t('common.id')}</dt><dd>#{service.id}</dd></div>
              <div className="detail-item"><dt>{t('roomServices.price')}</dt><dd>${service.price}</dd></div>
            </dl>
          </div>
        )}
      />
    </div>
  );
}
