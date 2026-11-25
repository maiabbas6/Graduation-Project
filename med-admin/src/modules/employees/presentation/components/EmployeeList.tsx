import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../../../../core/components/StatusBadge';
import type { EmployeeModel } from '../../data/models/EmployeeModel';
import './EmployeeList.css';

interface EmployeeListProps {
  employees: EmployeeModel[];
}

const formatDate = (value: string): string => {
  const date = new Date(value);
  return date.toLocaleDateString();
};

export function EmployeeList({ employees }: EmployeeListProps) {
  const { t } = useTranslation();

  if (employees === null || employees.length === 0) {
    return <p className="list-empty">{t('employees.noEmployees')}</p>;
  }

  return (
    <ul className="employee-list">
      {employees.map((employee) => (
        <li key={employee.id} className="employee-row">
          <div className="employee-avatar">
            {employee.section.icon ? <img src={employee.section.icon} alt="" /> : null}
          </div>
          <div className="employee-info">
            <strong className="employee-name">
              {employee.user.first_name} {employee.user.last_name}
            </strong>
            <span className="employee-meta">
              {employee.specialization} · {employee.section.name}
            </span>
            <span className="employee-meta">{employee.user.phone}</span>
          </div>
          <div className="employee-stats">
            <span className="employee-stat">
              {t('employees.hourRateLabel')} <strong>${employee.hour_rate}</strong>
            </span>
            <span className="employee-stat">
              {t('employees.licenseLabel')} <strong>{employee.license_no}</strong>
            </span>
            <span className="employee-stat">
              {t('employees.contractEndsLabel')} <strong>{formatDate(employee.contract_end_date)}</strong>
            </span>
          </div>
          <div className="employee-footer">
            <StatusBadge
              status={employee.is_active ? 'normal' : 'high'}
              label={employee.is_active ? t('common.active') : t('common.inactive')}
            />
            <Link to={`/employees/${employee.id}`} className="employee-view-link">
              {t('common.viewProfile')}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
