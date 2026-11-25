import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { StatusBadge } from '../../../../core/components/StatusBadge';
import { useEmployeeDetailController } from '../hooks/useEmployeeDetailController';
import { AddAttendanceModal } from '../components/AddAttendanceModal';
import { AddScheduleModal } from '../components/AddScheduleModal';
import { EmployeeAttendancesModal } from '../components/EmployeeAttendancesModal';
import './EmployeeDetailPage.css';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const formatDate = (value: string): string => {
  const date = new Date(value);
  return date.toLocaleDateString();
};

const dayLabel = (day: number): string => DAY_NAMES[day] ?? 'Unknown';

const timeLabel = (value: string): string => {
  const [hours, minutes] = value.split(':');
  return `${hours}:${minutes}`;
};

export function EmployeeDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id);
  const { state, refetch } = useEmployeeDetailController(employeeId);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAttendancesModalOpen, setIsAttendancesModalOpen] = useState(false);

  return (
    <div className="dashboard-page">
      <PageHeader
        title={t('employees.employeeProfile')}
        subtitle={t('employees.staffDetails')}
        actions={
          <div className="page-header-actions">
            <Link to={`/appointments?employee_id=${employeeId}`} className="btn-outline page-header-action">{t('sidebar.appointments')}</Link>
            <Link to={`/employees/${employeeId}/edit`} className="btn-outline page-header-action">{t('common.edit')}</Link>
          </div>
        }
      />

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(employee) => (
          <>
            <div className="dashboard-card employee-detail-hero">
              <div className="employee-detail-avatar">
                {employee.section.icon ? <img src={employee.section.icon} alt="" /> : null}
              </div>
              <div className="employee-detail-heading">
                <h2>
                  {employee.user.first_name} {employee.user.last_name}
                </h2>
                <p className="employee-detail-meta">
                  {employee.specialization} · {employee.section.name}
                </p>
                <div className="employee-detail-roles">
                  {employee.user.roles.map((role) => (
                    <span key={role} className="role-chip">{role}</span>
                  ))}
                  <StatusBadge
                    status={employee.is_active ? 'normal' : 'high'}
                    label={employee.is_active ? t('common.active') : t('common.inactive')}
                  />
                </div>
              </div>
            </div>

            <div className="employee-detail-grid">
              <div className="dashboard-card">
                <h3 className="employee-detail-section-title">{t('employees.personalDetails')}</h3>
                <dl className="employee-detail-list">
                  <div className="detail-item"><dt>{t('common.phone')}</dt><dd>{employee.user.phone}</dd></div>
                  <div className="detail-item"><dt>{t('common.gender')}</dt><dd>{employee.user.gender}</dd></div>
                  <div className="detail-item"><dt>{t('common.birth')}</dt><dd>{formatDate(employee.user.birth)}</dd></div>
                  <div className="detail-item"><dt>{t('common.address')}</dt><dd>{employee.user.address}</dd></div>
                </dl>
              </div>

              <div className="dashboard-card">
                <h3 className="employee-detail-section-title">{t('employees.professionalDetails')}</h3>
                <dl className="employee-detail-list">
                  <div className="detail-item"><dt>{t('employees.licenseNo')}</dt><dd>{employee.license_no}</dd></div>
                  <div className="detail-item"><dt>{t('employees.hourRate')}</dt><dd>${employee.hour_rate}</dd></div>
                  <div className="detail-item"><dt>{t('employees.contractEndDate')}</dt><dd>{formatDate(employee.contract_end_date)}</dd></div>
                  <div className="detail-item"><dt>{t('employees.qualifications')}</dt><dd>{employee.qualifications}</dd></div>
                </dl>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header-row">
                <h3 className="employee-detail-section-title">{t('employees.workSchedule')}</h3>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setIsScheduleModalOpen(true)}
                >
                  {t('employees.addSchedule')}
                </button>
              </div>
              {employee.schedules.length === 0 ? (
                <p className="list-empty">{t('employees.noSchedule')}</p>
              ) : (
                <ul className="schedule-list">
                  {employee.schedules.map((schedule) => (
                    <li key={schedule.id} className="schedule-row">
                      <strong>{dayLabel(schedule.day)}</strong>
                      <span>{timeLabel(schedule.start_at)} – {timeLabel(schedule.end_at)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="dashboard-card">
              <div className="card-header-row">
                <h3 className="employee-detail-section-title">{t('employees.attendances')}</h3>
                <div className="card-header-actions">
                  <Link
                    to={`/employees/${employeeId}/attendance-schedule-diff`}
                    className="btn-outline page-header-action"
                  >
                    {t('employees.scheduleDiff')}
                  </Link>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setIsAttendancesModalOpen(true)}
                  >
                    {t('employees.viewAll')}
                  </button>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setIsAttendanceModalOpen(true)}
                  >
                    {t('employees.addAttendance')}
                  </button>
                </div>
              </div>
              {!employee.attendances || employee.attendances.length === 0 ? (
                <p className="list-empty">{t('employees.noAttendances')}</p>
              ) : (
                <ul className="schedule-list">
                  {employee.attendances.map((attendance) => (
                    <li key={attendance.id} className="schedule-row">
                      <strong>{new Date(attendance.date_time).toLocaleString()}</strong>
                      <StatusBadge
                        status={attendance.type === 'in' ? 'normal' : 'pending'}
                        label={attendance.type === 'in' ? t('common.in') : t('common.out')}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="dashboard-card">
              <h3 className="employee-detail-section-title">{t('employees.attachments')}</h3>
              {employee.attatchments.length === 0 ? (
                <p className="list-empty">{t('employees.noAttachments')}</p>
              ) : (
                <ul className="attachment-list">
                  {employee.attatchments.map((attachment) => (
                    <li key={attachment.id} className="attachment-row">
                      <span className="attachment-name">{attachment.path.split('/').pop()}</span>
                      <span className="attachment-date">{formatDate(attachment.created_at)}</span>
                      <StatusBadge status="normal" label={t('common.attached')} />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="dashboard-card">
              <h3 className="employee-detail-section-title">{t('employees.permissions')}</h3>
              {employee.user.permissions.length === 0 ? (
                <p className="list-empty">{t('employees.noPermissions')}</p>
              ) : (
                <ul className="permission-list">
                  {employee.user.permissions.map((permission) => (
                    <li key={permission} className="permission-chip">{permission}</li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      />

      <AddAttendanceModal
        employeeId={employeeId}
        isOpen={isAttendanceModalOpen}
        onClose={() => setIsAttendanceModalOpen(false)}
        onCreated={() => refetch()}
      />

      <AddScheduleModal
        employeeId={employeeId}
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onCreated={() => refetch()}
      />

      <EmployeeAttendancesModal
        employeeId={employeeId}
        isOpen={isAttendancesModalOpen}
        onClose={() => setIsAttendancesModalOpen(false)}
      />
    </div>
  );
}
