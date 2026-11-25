import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { StatusBadge, type BadgeStatus } from '../../../../core/components/StatusBadge';
import type { AppointmentModel } from '../../data/models/AppointmentModel';
import './AppointmentsList.css';

interface AppointmentsListProps {
  appointments: AppointmentModel[];
}

const formatDate = (value: string | null): string => {
  if (!value) return '—';
  const date = new Date(value);
  return date.toLocaleString();
};

const badgeFor = (status: string, t: (key: string) => string): { status: BadgeStatus; label: string } => {
  switch (status) {
    case 'closed':
      return { status: 'completed', label: t('appointments.statusClosed') };
    case 'pending':
      return { status: 'pending', label: t('appointments.statusPending') };
    case 'waiting':
      return { status: 'in_progress', label: t('appointments.statusWaiting') };
    case 'canceled':
      return { status: 'high', label: t('appointments.statusCanceled') };
    case 'suspended':
      return { status: 'high', label: t('appointments.statusSuspended') };
    default:
      return { status: 'normal', label: status };
  }
};

export function AppointmentsList({ appointments }: AppointmentsListProps) {
  const { t } = useTranslation();

  if (!appointments || appointments.length === 0) {
    return <p className="list-empty">{t('appointments.noAppointments')}</p>;
  }

  return (
    <ul className="appointment-list">
      {appointments.map((appointment) => {
        const badge = badgeFor(appointment.status, t);
        return (
          <li key={appointment.id} className="appointment-row">
            <div className="appointment-info">
              <strong className="appointment-title">
                {appointment.type.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </strong>
              <span className="appointment-meta">
                {formatDate(appointment.appointment_date_time)} · Room {appointment.room_id ?? '—'} · Employee{' '}
                {appointment.employee_id ?? '—'}
              </span>
              {appointment.description ? (
                <span className="appointment-desc">{appointment.description}</span>
              ) : null}
            </div>
            <StatusBadge status={badge.status} label={badge.label} />
            <Link to={`/appointments/${appointment.id}`} className="appointment-view-link">
              {t('common.view')}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}