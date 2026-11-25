import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { useTopEmployeesController } from '../hooks/useTopEmployeesController';
import './TopEmployeesPage.css';

export function TopEmployeesPage() {
    const { t } = useTranslation();
    const { state, refetch } = useTopEmployeesController();

    return (
        <div className="dashboard-page">
            <PageHeader title={t('topEmployees.title')} subtitle={t('topEmployees.subtitle')} />

            <StatusComponent
                state={state}
                onError={(message) => (
                    <div className="dashboard-card dashboard-error">
                        <p>{message}</p>
                        <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
                    </div>
                )}
                onSuccess={(employees) => (
                    <div className="dashboard-card">
                        {employees.length === 0 ? (
                            <p className="list-empty">{t('topEmployees.noEmployees')}</p>
                        ) : (
                            <ul className="top-employee-list">
                                {employees.map((employee, index) => (
                                    <li key={employee.id} className="top-employee-row">
                                        <span className="top-employee-rank">#{index + 1}</span>
                                        <div className="top-employee-info">
                                            <strong className="top-employee-name">
                                                {employee.user.first_name} {employee.user.last_name}
                                            </strong>
                                            <span className="top-employee-meta">
                                                {employee.specialization} · {employee.section.name}
                                            </span>
                                            <span className="top-employee-stats">
                                                {t('topEmployees.clients')}: {employee.clients_count} · {t('topEmployees.workMinutes')}: {employee.work_minutes}
                                            </span>
                                            <span className="top-employee-license">{employee.license_no}</span>
                                        </div>
                                        <Link to={`/employees/${employee.id}`} className="top-employee-view">
                                            {t('common.view')}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            />
        </div>
    );
}
