import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { Pagination } from '../../../../core/components/Pagination';
import { useClientsController } from '../hooks/useClientsController';
import { ClientsList } from '../components/ClientsList';
import './ClientsPage.css';

export function ClientsPage() {
  const { t } = useTranslation();
  const { state, goToPage, refetch } = useClientsController();

  return (
    <div className="dashboard-page">
      <PageHeader title={t('clients.title')} subtitle={t('clients.subtitle')} />

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
              <ClientsList clients={result.data} />
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
