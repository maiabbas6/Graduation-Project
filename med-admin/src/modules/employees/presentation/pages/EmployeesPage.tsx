import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { Pagination } from '../../../../core/components/Pagination';
import { useEmployeesController } from '../hooks/useEmployeesController';
import { EmployeeFilters } from '../components/EmployeeFilters';
import { EmployeeList } from '../components/EmployeeList';
import './EmployeesPage.css';

export function EmployeesPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get('section_id');

  const initialFilters = sectionId !== null && sectionId !== ''
    ? { section_id: Number(sectionId) }
    : {};

  const { state, filters, sections, goToPage, applyFilters, resetFilters, refetch } =
    useEmployeesController(initialFilters);

  return (
    <div className="dashboard-page">
      <PageHeader
        title={t('employees.title')}
        subtitle={t('employees.subtitle')}
        actions={<Link to="/employees/new" className="btn-primary-pill">{t('employees.newEmployee')}</Link>}
      />

      <EmployeeFilters
        filters={filters}
        sections={sections.isSuccess ? (sections.state.data ?? []) : []}
        onApply={applyFilters}
        onReset={resetFilters}
      />

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(result) => (
          <>
            <div className="dashboard-card">
              <div className="employee-card-head">
                <span className="employee-count">{t('employees.count', { count: result.total })}</span>
              </div>
              <EmployeeList employees={result.data} />
            </div>
            <Pagination
              currentPage={result.current_page}
              lastPage={result.last_page}
              onChange={goToPage}
            />
          </>
        )}
      />
    </div>
  );
}
