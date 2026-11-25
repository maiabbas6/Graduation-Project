import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../core/components/Modal';
import { useCreateAttendanceController } from '../hooks/useCreateAttendanceController';
import type { AttendanceType } from '../../data/models/AttendanceModel';
import './AddAttendanceModal.css';

interface AddAttendanceModalProps {
  employeeId: number;
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function AddAttendanceModal({ employeeId, isOpen, onClose, onCreated }: AddAttendanceModalProps) {
  const { t } = useTranslation();
  const { isSubmitting, isSuccess, isError, error, createAttendance } = useCreateAttendanceController();
  const [dateTime, setDateTime] = useState('');
  const [type, setType] = useState<AttendanceType>('in');
  const handledSuccess = useRef(false);

  useEffect(() => {
    if (isOpen) {
      handledSuccess.current = false;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess && !handledSuccess.current) {
      handledSuccess.current = true;
      setDateTime('');
      setType('in');
      onCreated();
      onClose();
    }
  }, [isSuccess, onCreated, onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createAttendance({ employee_id: employeeId, date_time: dateTime, type });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('employees.addAttendanceTitle')}>
      <form className="attendance-form" onSubmit={handleSubmit}>
        <label className="attendance-field">
          <span>{t('employees.dateTime')}</span>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(event) => setDateTime(event.target.value)}
            required
          />
        </label>

        <label className="attendance-field">
          <span>{t('employees.type')}</span>
          <select value={type} onChange={(event) => setType(event.target.value as AttendanceType)}>
            <option value="in">{t('common.in')}</option>
            <option value="out">{t('common.out')}</option>
          </select>
        </label>

        {isError && <p className="attendance-error">{String(error)}</p>}

        <div className="attendance-actions">
          <button type="button" className="btn-outline" onClick={onClose}>{t('common.cancel')}</button>
          <button type="submit" className="btn-primary-pill" disabled={isSubmitting}>
            {isSubmitting ? t('common.saving') : t('common.save')}
          </button>
        </div>
      </form>
    </Modal>
  );
}
