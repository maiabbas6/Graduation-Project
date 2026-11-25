import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../core/components/Modal';
import { Pagination } from '../../../../core/components/Pagination';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { StatusBadge } from '../../../../core/components/StatusBadge';
import { useEmployeeAttendancesController } from '../hooks/useEmployeeAttendancesController';
import './EmployeeAttendancesModal.css';

interface EmployeeAttendancesModalProps {
  employeeId: number;
  isOpen: boolean;
  onClose: () => void;
}

const formatDateTime = (value: string): string => {
  return new Date(value).toLocaleString();
};

export function EmployeeAttendancesModal({ employeeId, isOpen, onClose }: EmployeeAttendancesModalProps) {
  const { t } = useTranslation();
  const { state, goToPage, refetch } = useEmployeeAttendancesController(employeeId, isOpen);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('employees.attendances')}>
      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="attendances-modal-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(result) => (
          <>
            {result.data.length === 0 ? (
              <p className="list-empty">{t('employees.noAttendances')}</p>
            ) : (
              <ul className="attendances-modal-list">
                {result.data.map((attendance) => (
                  <li key={attendance.id} className="attendances-modal-row">
                    <span className="attendances-modal-date">{formatDateTime(attendance.date_time)}</span>
                    <StatusBadge
                      status={attendance.type === 'in' ? 'normal' : 'pending'}
                      label={attendance.type === 'in' ? t('common.in') : t('common.out')}
                    />
                  </li>
                ))}
              </ul>
            )}
            <div className="attendances-modal-pagination">
              <Pagination
                currentPage={result.current_page}
                lastPage={result.last_page}
                onChange={goToPage}
              />
            </div>
          </>
        )}
      />
    </Modal>
  );
}
