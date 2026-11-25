import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { StatusBadge } from '../../../../core/components/StatusBadge';
import { useAppointmentDetailController } from '../hooks/useAppointmentDetailController';
import './AppointmentDetailPage.css';

const formatDateTime = (value: string | null): string => {
  if (!value) return '—';
  const date = new Date(value);
  return date.toLocaleString();
};

export function AppointmentDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const appointmentId = Number(id);
  const { state, refetch } = useAppointmentDetailController(appointmentId);

  const employeeName = (first?: string, last?: string): string => {
    if (!first) return '—';
    return `${first} ${last ?? ''}`.trim();
  };

  return (
    <div className="dashboard-page">
      <PageHeader
        title={t('appointments.appointmentDetail')}
        subtitle={t('appointments.appointmentDetails')}
        actions={<Link to={`/appointments/${appointmentId}/edit`} className="btn-outline">{t('common.edit')}</Link>}
      />

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(appointment) => (
          <>
            <div className="dashboard-card appointment-detail-hero">
              <div className="appointment-detail-heading">
                <h2>{appointment.type.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</h2>
                <p className="appointment-detail-meta">
                  {formatDateTime(appointment.appointment_date_time)}
                </p>
                <StatusBadge
                  status={appointment.status === 'closed' ? 'completed' : appointment.status === 'waiting' ? 'in_progress' : appointment.status === 'pending' ? 'pending' : appointment.status === 'canceled' || appointment.status === 'suspended' ? 'high' : 'normal'}
                  label={appointment.status.toUpperCase()}
                />
              </div>
            </div>

            <div className="appointment-detail-grid">
              <div className="dashboard-card">
                <h3 className="appointment-detail-section-title">{t('appointments.patient')}</h3>
                <dl className="appointment-detail-list">
                  <div className="detail-item"><dt>{t('common.name')}</dt><dd><Link className="detail-link" to={`/clients/${appointment.user.id}`}>{employeeName(appointment.user.first_name, appointment.user.last_name)}</Link></dd></div>
                  <div className="detail-item"><dt>{t('common.phone')}</dt><dd>{appointment.user.phone}</dd></div>
                  <div className="detail-item"><dt>{t('common.address')}</dt><dd>{appointment.user.address}</dd></div>
                </dl>
              </div>

              <div className="dashboard-card">
                <h3 className="appointment-detail-section-title">{t('appointments.staffAndRoom')}</h3>
                <dl className="appointment-detail-list">
                  <div className="detail-item"><dt>{t('appointments.employee')}</dt><dd>{appointment.employee ? <Link className="detail-link" to={`/employees/${appointment.employee.id}`}>{employeeName(appointment.employee.user.first_name, appointment.employee.user.last_name)}</Link> : '—'}</dd></div>
                  <div className="detail-item"><dt>{t('appointments.specialization')}</dt><dd>{appointment.employee?.specialization ?? '—'}</dd></div>
                  <div className="detail-item"><dt>{t('appointments.room')}</dt><dd>{appointment.room?.name ?? '—'}</dd></div>
                </dl>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="appointment-detail-section-title">{t('appointments.details')}</h3>
              <dl className="appointment-detail-list">
                <div className="detail-item"><dt>{t('appointments.scheduled')}</dt><dd>{formatDateTime(appointment.appointment_date_time)}</dd></div>
                <div className="detail-item"><dt>{t('appointments.closedAt')}</dt><dd>{formatDateTime(appointment.appointment_closed_at)}</dd></div>
                <div className="detail-item"><dt>{t('appointments.description')}</dt><dd><span className="detail-text">{appointment.description ?? '—'}</span></dd></div>
              </dl>
            </div>

            <div className="dashboard-card">
              <h3 className="appointment-detail-section-title">{t('common.attached')}</h3>
              {appointment.attatchments.length === 0 ? (
                <p className="list-empty">{t('appointments.noAttachments')}</p>
              ) : (
                <ul className="attachment-list">
                  {appointment.attatchments.map((attachment) => (
                    <li key={attachment.id} className="attachment-row">
                      <span className="attachment-name">{attachment.path.split('/').pop()}</span>
                      <span className="attachment-date">{attachment.created_at}</span>
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
