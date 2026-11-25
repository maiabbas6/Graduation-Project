import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import type { RoomModel } from '../../../../core/models/RoomModel';
import type {
  AppointmentQueryParams,
} from '../../data/queries/AppointmentQueryParams';
import type { AppointmentStatus, AppointmentType } from '../../data/models/AppointmentModel';

interface AppointmentFiltersProps {
  filters: AppointmentQueryParams;
  rooms: RoomModel[];
  onApply: (filters: AppointmentQueryParams) => void;
  onReset: () => void;
}

export function AppointmentFilters({ filters, rooms, onApply, onReset }: AppointmentFiltersProps) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<string>(filters.status ?? '');
  const [type, setType] = useState<string>(filters.type ?? '');
  const [roomId, setRoomId] = useState<string>(filters.room_id !== undefined ? String(filters.room_id) : '');
  const [before, setBefore] = useState(filters.before ?? '');
  const [after, setAfter] = useState(filters.after ?? '');

  const STATUS_OPTIONS: { value: AppointmentStatus; label: string }[] = [
    { value: 'waiting', label: t('appointments.statusWaiting') },
    { value: 'closed', label: t('appointments.statusClosed') },
    { value: 'canceled', label: t('appointments.statusCanceled') },
    { value: 'suspended', label: t('appointments.statusSuspended') },
  ];

  const TYPE_OPTIONS: { value: AppointmentType; label: string }[] = [
    { value: 'consultation', label: t('appointments.typeConsultation') },
    { value: 'follow-up', label: t('appointments.typeFollowUp') },
    { value: 'routine-check', label: t('appointments.typeRoutineCheck') },
    { value: 'urgent', label: t('appointments.typeUrgent') },
    { value: 'surgery', label: t('appointments.typeSurgery') },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply({
      status: (status as AppointmentStatus) || undefined,
      type: (type as AppointmentType) || undefined,
      room_id: roomId === '' ? undefined : Number(roomId),
      before: before || undefined,
      after: after || undefined,
    });
  };

  const handleReset = () => {
    setStatus('');
    setType('');
    setRoomId('');
    setBefore('');
    setAfter('');
    onReset();
  };

  return (
    <form className="filter-bar" onSubmit={handleSubmit}>
      <label className="filter-field">
        <span>{t('appointments.status')}</span>
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="">{t('common.all')}</option>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>

      <label className="filter-field">
        <span>{t('appointments.type')}</span>
        <select value={type} onChange={(event) => setType(event.target.value)}>
          <option value="">{t('common.all')}</option>
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>

      <label className="filter-field">
        <span>{t('appointments.room')}</span>
        <select value={roomId} onChange={(event) => setRoomId(event.target.value)}>
          <option value="">{t('appointments.allRooms')}</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>{room.name}</option>
          ))}
        </select>
      </label>

      <label className="filter-field">
        <span>{t('appointments.after')}</span>
        <input type="date" value={after} onChange={(event) => setAfter(event.target.value)} />
      </label>

      <label className="filter-field">
        <span>{t('appointments.before')}</span>
        <input type="date" value={before} onChange={(event) => setBefore(event.target.value)} />
      </label>

      <button type="submit" className="filter-button">{t('common.filter')}</button>
      <button type="button" className="filter-button filter-button-reset" onClick={handleReset}>
        {t('common.reset')}
      </button>
    </form>
  );
}