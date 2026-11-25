import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { Pagination } from '../../../../core/components/Pagination';
import { useSystemLogsController } from '../hooks/useSystemLogsController';
import { SystemLogsList } from '../components/SystemLogsList';
import type { SystemLogQueryParams } from '../../data/queries/SystemLogQueryParams';
import './SystemLogsPage.css';

export function SystemLogsPage() {
  const { t } = useTranslation();
  const { state, page, goToPage, applyFilters, resetFilters, refetch } = useSystemLogsController();
  const [draft, setDraft] = useState<SystemLogQueryParams>({});

  const handleApply = () => {
    const next: SystemLogQueryParams = {};
    if (draft.user_id !== undefined && !Number.isNaN(draft.user_id)) next.user_id = draft.user_id;
    if (draft.start_date) next.start_date = draft.start_date;
    if (draft.end_date) next.end_date = draft.end_date;
    applyFilters(next);
  };

  const handleReset = () => {
    setDraft({});
    resetFilters();
  };

  return (
    <div className="dashboard-page">
      <PageHeader title={t('systemLogs.title')} subtitle={t('systemLogs.subtitle')} />

      <div className="dashboard-card filter-bar">
        <label className="filter-field">
          <span>{t('systemLogs.userId')}</span>
          <input
            type="number"
            placeholder={t('systemLogs.filterByUser')}
            value={draft.user_id ?? ''}
            onChange={(event) =>
              setDraft({ ...draft, user_id: event.target.value === '' ? undefined : Number(event.target.value) })
            }
          />
        </label>
        <label className="filter-field">
          <span>{t('systemLogs.startDate')}</span>
          <input
            type="date"
            value={draft.start_date ?? ''}
            onChange={(event) => setDraft({ ...draft, start_date: event.target.value || undefined })}
          />
        </label>
        <label className="filter-field">
          <span>{t('systemLogs.endDate')}</span>
          <input
            type="date"
            value={draft.end_date ?? ''}
            onChange={(event) => setDraft({ ...draft, end_date: event.target.value || undefined })}
          />
        </label>
        <div className="filter-actions">
          <button className="filter-button" onClick={handleApply}>{t('common.apply')}</button>
          <button className="filter-button filter-button-reset" onClick={handleReset}>{t('common.reset')}</button>
        </div>
      </div>

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
              <SystemLogsList logs={result.data} />
            </div>
            <Pagination
              currentPage={page}
              lastPage={result.pages}
              onChange={goToPage}
            />
          </>
        )}
      />
    </div>
  );
}
