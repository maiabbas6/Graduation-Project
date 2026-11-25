import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { StatusBadge } from '../../../../core/components/StatusBadge';
import { useAttendanceScheduleDiffController } from '../hooks/useAttendanceScheduleDiffController';
import './AttendanceScheduleDiffPage.css';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const formatDate = (value: string): string => {
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString();
};

const dayLabel = (day: number): string => DAY_NAMES[day] ?? 'Unknown';

const formatDiff = (minutes: number): string => {
  const sign = minutes < 0 ? '-' : '';
  const abs = Math.abs(minutes);
  const hours = Math.floor(abs / 60);
  const rest = abs % 60;
  if (hours === 0) return `${sign}${rest}m`;
  if (rest === 0) return `${sign}${hours}h`;
  return `${sign}${hours}h ${rest}m`;
};

export function AttendanceScheduleDiffPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id);
  const { state, refetch } = useAttendanceScheduleDiffController(employeeId);

  return (
    <div className="dashboard-page">
      <PageHeader title={t('employees.attendanceVsSchedule')} subtitle={t('employees.compareHours')} />

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(items) => (
          <>
            {items.length === 0 ? (
              <p className="list-empty">{t('employees.noDiffData')}</p>
            ) : (
              <div className="diff-grid">
                {items.map((item) => (
                  <div key={item.date} className="dashboard-card diff-card">
                    <div className="diff-card-header">
                      <h3>{formatDate(item.date)}</h3>
                      <StatusBadge status="normal" label={dayLabel(item.day)} />
                    </div>
                    <p className="diff-schedule">
                      {t('employees.schedule')}: <strong>{item.schedule.start_at}</strong> – <strong>{item.schedule.end_at}</strong>
                    </p>
                    {item.attendances.length === 0 ? (
                      <p className="list-empty">{t('employees.noAttendancesData')}</p>
                    ) : (
                      <ul className="diff-attendance-list">
                        {item.attendances.map((attendance) => (
                          <li key={attendance.id} className="diff-attendance-row">
                            <StatusBadge
                              status={attendance.type === 'in' ? 'normal' : 'pending'}
                              label={attendance.type === 'in' ? t('common.in') : t('common.out')}
                            />
                            <span className="diff-time">{attendance.time}</span>
                            <span className="diff-minutes">{formatDiff(attendance.diff_minutes)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}
