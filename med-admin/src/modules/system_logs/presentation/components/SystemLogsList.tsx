import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StatusBadge, type BadgeStatus } from '../../../../core/components/StatusBadge';
import type { SystemLogModel } from '../../data/models/SystemLogModel';
import './SystemLogsList.css';

interface SystemLogsListProps {
  logs: SystemLogModel[];
}

const formatDate = (value: string): string => {
  return new Date(value).toLocaleString();
};

const methodBadge = (method: string): BadgeStatus => {
  switch (method.toUpperCase()) {
    case 'POST':
    case 'PUT':
    case 'PATCH':
      return 'in_progress';
    case 'DELETE':
      return 'high';
    default:
      return 'normal';
  }
};

export function SystemLogsList({ logs }: SystemLogsListProps) {
  const { t } = useTranslation();

  if (!logs || logs.length === 0) {
    return <p className="list-empty">{t('systemLogs.noLogs')}</p>;
  }

  return (
    <ul className="log-list">
      {logs.map((log) => (
        <li key={log.id} className="log-row">
          <Link className="log-link" to={`/system-logs/${log.id}`}>
            <div className="log-info">
              <strong className="log-route">{log.route}</strong>
              <span className="log-meta">
                User #{log.user_id} · {log.ip} · {formatDate(log.created_at)}
              </span>
            </div>
            <StatusBadge status={methodBadge(log.info.request_method)} label={log.info.request_method} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
