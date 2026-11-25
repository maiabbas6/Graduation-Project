import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { Pagination } from '../../../../core/components/Pagination';
import { useAppointmentsController } from '../hooks/useAppointmentsController';
import { AppointmentFilters } from '../components/AppointmentFilters';
import { AppointmentsList } from '../components/AppointmentsList';

export function AppointmentsStatisticsPage() {
  const { t } = useTranslation();
  const { state, filters, rooms, goToPage, applyFilters, resetFilters, refetch } = useAppointmentsController();

  return (
    <div className="dashboard-page">
      <PageHeader title={t('appointments.title')} subtitle={t('appointments.statisticsSubtitle')} />

      <AppointmentFilters
        filters={filters}
        rooms={rooms.isSuccess ? (rooms.state.data ?? []) : []}
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
              <AppointmentsList appointments={result.data} />
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
