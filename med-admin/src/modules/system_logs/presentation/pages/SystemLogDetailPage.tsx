import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { StatusBadge } from '../../../../core/components/StatusBadge';
import { useSystemLogDetailController } from '../hooks/useSystemLogDetailController';
import './SystemLogDetailPage.css';

const formatDate = (value: string): string => {
  return new Date(value).toLocaleString();
};

const formatBody = (body: unknown): string => {
  if (body === null || body === undefined) return 'N/A';
  if (typeof body === 'string' && body === '') return 'N/A';
  return JSON.stringify(body, null, 2);
};

export function SystemLogDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const logId = Number(id);
  const { state, refetch } = useSystemLogDetailController(logId);

  return (
    <div className="dashboard-page">
      <PageHeader title={t('systemLogs.logDetail')} subtitle={t('systemLogs.logDetails')} />

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(log) => (
          <>
            <div className="dashboard-card log-detail-hero">
              <div className="log-detail-heading">
                <h2>{log.route}</h2>
                <div className="log-detail-badges">
                  <StatusBadge status="normal" label={log.info.request_method} />
                  <StatusBadge status="in_progress" label={`User #${log.user_id}`} />
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="log-detail-section-title">{t('systemLogs.requestDetails')}</h3>
              <dl className="log-detail-list">
                <div className="detail-item"><dt>{t('common.id')}</dt><dd>#{log.id}</dd></div>
                <div className="detail-item"><dt>{t('systemLogs.ip')}</dt><dd>{log.ip}</dd></div>
                <div className="detail-item"><dt>{t('systemLogs.route')}</dt><dd>{log.route}</dd></div>
                <div className="detail-item"><dt>{t('systemLogs.created')}</dt><dd>{formatDate(log.created_at)}</dd></div>
                <div className="detail-item"><dt>{t('systemLogs.updated')}</dt><dd>{formatDate(log.updated_at)}</dd></div>
              </dl>
              <h4 className="log-detail-section-title">{t('systemLogs.requestBody')}</h4>
              <pre className="log-request-body">{formatBody(log.info.request_body)}</pre>
            </div>

            {log.user && (
              <div className="dashboard-card">
                <h3 className="log-detail-section-title">{t('systemLogs.user')}</h3>
                <dl className="log-detail-list">
                  <div className="detail-item"><dt>{t('common.name')}</dt><dd>{log.user.first_name} {log.user.last_name}</dd></div>
                  <div className="detail-item"><dt>{t('common.phone')}</dt><dd>{log.user.phone}</dd></div>
                  <div className="detail-item"><dt>{t('common.gender')}</dt><dd>{log.user.gender}</dd></div>
                  <div className="detail-item"><dt>{t('common.birth')}</dt><dd>{new Date(log.user.birth).toLocaleDateString()}</dd></div>
                  <div className="detail-item"><dt>{t('common.address')}</dt><dd>{log.user.address}</dd></div>
                </dl>
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}
