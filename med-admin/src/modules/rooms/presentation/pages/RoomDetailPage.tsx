import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { StatusBadge } from '../../../../core/components/StatusBadge';
import { useRoomDetailController } from '../hooks/useRoomDetailController';
import './RoomDetailPage.css';

const formatDate = (value: string): string => {
  const date = new Date(value);
  return date.toLocaleString();
};

export function RoomDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const roomId = Number(id);
  const { state, refetch } = useRoomDetailController(roomId);

  return (
    <div className="dashboard-page">
      <PageHeader title={t('rooms.roomDetail')} subtitle={t('rooms.roomDetails')} />

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(room) => (
          <>
            <div className="dashboard-card">
              <h2>{room.name}</h2>
              <p className="page-subtitle">Room #{room.id}</p>
            </div>

            <div className="dashboard-card">
              <h3 className="room-detail-section-title">{t('rooms.appointments')}</h3>
              {room.appointments.length === 0 ? (
                <p className="list-empty">{t('rooms.noAppointments')}</p>
              ) : (
                <ul className="room-appointments-list">
                  {room.appointments.map((appointment) => (
                    <li key={appointment.id}>
                      <Link className="room-appointment-row" to={`/appointments/${appointment.id}`}>
                        <div className="room-appointment-head">
                          <StatusBadge status={appointment.status === 'closed' ? 'completed' : 'pending'} label={appointment.status} />
                          <StatusBadge status="normal" label={appointment.type} />
                          <span className="room-appointment-date">{formatDate(appointment.appointment_date_time)}</span>
                        </div>
                        <p className="room-appointment-description">{appointment.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      />
    </div>
  );
}
