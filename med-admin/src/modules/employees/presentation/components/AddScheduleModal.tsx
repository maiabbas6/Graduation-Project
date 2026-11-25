import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../core/components/Modal';
import { useCreateScheduleController } from '../hooks/useCreateScheduleController';
import './AddScheduleModal.css';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface AddScheduleModalProps {
  employeeId: number;
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function AddScheduleModal({ employeeId, isOpen, onClose, onCreated }: AddScheduleModalProps) {
  const { t } = useTranslation();
  const { isSubmitting, isSuccess, isError, error, createSchedule } = useCreateScheduleController();
  const [day, setDay] = useState(0);
  const [startAt, setStartAt] = useState('09:00');
  const [endAt, setEndAt] = useState('17:00');
  const handledSuccess = useRef(false);

  useEffect(() => {
    if (isOpen) {
      handledSuccess.current = false;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess && !handledSuccess.current) {
      handledSuccess.current = true;
      setDay(0);
      setStartAt('09:00');
      setEndAt('17:00');
      onCreated();
      onClose();
    }
  }, [isSuccess, onCreated, onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createSchedule({ employee_id: employeeId, day, start_at: startAt, end_at: endAt });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('employees.addScheduleTitle')}>
      <form className="schedule-form" onSubmit={handleSubmit}>
        <label className="schedule-field">
          <span>{t('employees.day')}</span>
          <select value={day} onChange={(event) => setDay(Number(event.target.value))}>
            {DAY_NAMES.map((name, index) => (
              <option key={index} value={index}>{name}</option>
            ))}
          </select>
        </label>

        <label className="schedule-field">
          <span>{t('employees.startTime')}</span>
          <input type="time" value={startAt} onChange={(event) => setStartAt(event.target.value)} required />
        </label>

        <label className="schedule-field">
          <span>{t('employees.endTime')}</span>
          <input type="time" value={endAt} onChange={(event) => setEndAt(event.target.value)} required />
        </label>

        {isError && <p className="schedule-error">{String(error)}</p>}

        <div className="schedule-actions">
          <button type="button" className="btn-outline" onClick={onClose}>{t('common.cancel')}</button>
          <button type="submit" className="btn-primary-pill" disabled={isSubmitting}>
            {isSubmitting ? t('common.saving') : t('common.save')}
          </button>
        </div>
      </form>
    </Modal>
  );
}
