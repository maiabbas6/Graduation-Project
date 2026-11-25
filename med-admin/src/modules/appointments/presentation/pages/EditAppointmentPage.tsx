import { useEffect, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { useEditAppointmentController } from '../hooks/useEditAppointmentController';
import type { AppointmentStatus, AppointmentType } from '../../data/models/AppointmentModel';
import './EditAppointmentPage.css';

const STATUS_OPTIONS: AppointmentStatus[] = ['waiting', 'canceled', 'suspended', 'closed'];

const TYPE_OPTIONS: AppointmentType[] = ['consultation', 'follow-up', 'routine-check', 'urgent', 'surgery'];

interface EditForm {
  status: AppointmentStatus;
  room_id: string;
  employee_id: string;
  appointment_date_time: string;
  appointment_closed_at: string;
  description: string;
  type: AppointmentType;
}

const toDatetimeLocal = (value: string | null): string => {
  if (!value) return '';
  const date = new Date(value);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export function EditAppointmentPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const appointmentId = Number(id);
  const navigate = useNavigate();
  const { appointment, rooms, employees, state, isSubmitting, updateAppointment } =
    useEditAppointmentController(appointmentId);

  const [form, setForm] = useState<EditForm>({
    status: 'waiting',
    room_id: '',
    employee_id: '',
    appointment_date_time: '',
    appointment_closed_at: '',
    description: '',
    type: 'consultation',
  });

  useEffect(() => {
    if (appointment.isSuccess && appointment.state.data) {
      const data = appointment.state.data;
      setForm({
        status: data.status as AppointmentStatus,
        room_id: data.room_id ? String(data.room_id) : '',
        employee_id: data.employee_id ? String(data.employee_id) : '',
        appointment_date_time: toDatetimeLocal(data.appointment_date_time),
        appointment_closed_at: toDatetimeLocal(data.appointment_closed_at),
        description: data.description ?? '',
        type: data.type as AppointmentType,
      });
    }
  }, [appointment.isSuccess, appointment.state.data]);

  useEffect(() => {
    if (state.isSuccess) {
      navigate(`/appointments/${appointmentId}`);
    }
  }, [state.isSuccess, navigate, appointmentId]);

  const updateField = <K extends keyof EditForm>(key: K, value: EditForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateAppointment({
      status: form.status,
      type: form.type,
      room_id: form.room_id === '' ? undefined : Number(form.room_id),
      employee_id: form.employee_id === '' ? undefined : Number(form.employee_id),
      appointment_date_time: form.appointment_date_time === '' ? undefined : new Date(form.appointment_date_time).toISOString(),
      appointment_closed_at: form.appointment_closed_at === '' ? null : new Date(form.appointment_closed_at).toISOString(),
      description: form.description === '' ? undefined : form.description,
    });
  };

  const roomOptions = rooms.isSuccess ? (rooms.state.data ?? []) : [];
  const employeeOptions = employees.isSuccess ? (employees.state.data ?? []) : [];

  return (
    <div className="dashboard-page">
      <PageHeader title={t('appointments.editAppointment')} subtitle={t('appointments.updateDetails')} />

      <StatusComponent
        state={appointment.state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
          </div>
        )}
        onSuccess={() => (
          <form className="dashboard-card edit-appointment-card" onSubmit={handleSubmit}>
            <div className="edit-grid">
              <label className="edit-field">
                <span>{t('appointments.status')}</span>
                <select value={form.status} onChange={(event) => updateField('status', event.target.value as AppointmentStatus)}>
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </label>

              <label className="edit-field">
                <span>{t('appointments.type')}</span>
                <select value={form.type} onChange={(event) => updateField('type', event.target.value as AppointmentType)}>
                  {TYPE_OPTIONS.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </label>

              <label className="edit-field">
                <span>{t('appointments.room')}</span>
                <select value={form.room_id} onChange={(event) => updateField('room_id', event.target.value)}>
                  <option value="">{t('appointments.noRoom')}</option>
                  {roomOptions.map((room) => (
                    <option key={room.id} value={room.id}>{room.name}</option>
                  ))}
                </select>
              </label>

              <label className="edit-field">
                <span>{t('appointments.employee')}</span>
                <select value={form.employee_id} onChange={(event) => updateField('employee_id', event.target.value)}>
                  <option value="">{t('appointments.noEmployee')}</option>
                  {employeeOptions.map((employee) => (
                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                  ))}
                </select>
              </label>

              <label className="edit-field">
                <span>{t('appointments.scheduledDateTime')}</span>
                <input
                  type="datetime-local"
                  value={form.appointment_date_time}
                  onChange={(event) => updateField('appointment_date_time', event.target.value)}
                />
              </label>

              <label className="edit-field">
                <span>{t('appointments.closedAtLabel')}</span>
                <input
                  type="datetime-local"
                  value={form.appointment_closed_at}
                  onChange={(event) => updateField('appointment_closed_at', event.target.value)}
                />
              </label>

              <label className="edit-field edit-field-wide">
                <span>{t('appointments.descriptionLabel')}</span>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(event) => updateField('description', event.target.value)}
                />
              </label>
            </div>

            {state.isError && <p className="edit-error">{String(state.error)}</p>}

            <div className="edit-actions">
              <button type="button" className="btn-outline" onClick={() => navigate(`/appointments/${appointmentId}`)}>
                {t('common.cancel')}
              </button>
              <button type="submit" className="btn-primary-pill" disabled={isSubmitting}>
                {isSubmitting ? t('common.saving') : t('common.saveChanges')}
              </button>
            </div>
          </form>
        )}
      />
    </div>
  );
}