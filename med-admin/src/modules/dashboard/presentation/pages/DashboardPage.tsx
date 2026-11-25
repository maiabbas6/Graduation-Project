import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { StatCard } from '../../../../core/components/StatCard';
import { useDashboardController } from '../hooks/useDashboardController';
import { DashboardIcon } from '../components/DashboardIcon';
import { usePermission } from '../../../../core/hooks/usePermission';
import { PERMISSIONS } from '../../../../core/const/permissions';
import { downloadStatisticsPdf } from '../../../../core/utils/pdfHelper';
import './DashboardPage.css';

interface StatConfig {
  key: keyof DashboardCounts;
  title: string;
  icon: string;
  to?: string;
}

const statConfigs: StatConfig[] = [
  { key: 'appointments', title: 'dashboard.appointments', icon: 'calendar', to: '/statistics/appointments' },
  { key: 'employees', title: 'dashboard.employees', icon: 'medical personnel', to: '/employees' },
  { key: 'users', title: 'dashboard.users', icon: 'user', to: '/clients' },
  { key: 'rooms', title: 'dashboard.rooms', icon: 'hospital building', to: '/rooms' },
  { key: 'room_services', title: 'dashboard.roomServices', icon: 'medical bag' },
  { key: 'section', title: 'dashboard.sections', icon: 'hospital sign', to: '/sections' },
  { key: 'roles', title: 'dashboard.roles', icon: 'badge check' },
  { key: 'attendances', title: 'dashboard.attendances', icon: 'check clipboard' },
  { key: 'attatchments', title: 'dashboard.attachments', icon: 'paperclip' },
  { key: 'ai_chats', title: 'dashboard.aiChats', icon: 'artificial intelligence' },
  { key: 'ai_message', title: 'dashboard.aiMessages', icon: 'conversation' },
];

export function DashboardPage() {
  const { t } = useTranslation();
  const { state, refetch } = useDashboardController();
  const navigate = useNavigate();
  const canExport = usePermission(PERMISSIONS.EXPORT_STATISTICS);

  return (
    <div className="dashboard-page">
      <PageHeader
        title={t('dashboard.welcomeBack')}
        subtitle={t('dashboard.overview')}
        actions={
          canExport ? (
            <button
              className="btn-primary-pill"
              onClick={() => downloadStatisticsPdf()}
            >
              {t('common.exportPdf')}
            </button>
          ) : undefined
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
        onSuccess={(data) => (
          <div className="stats-grid">
            {statConfigs.map((cfg) => (
              <StatCard
                key={cfg.key}
                title={t(cfg.title)}
                value={data.counts[cfg.key]}
                subtitle={cfg.to ? t('dashboard.openStatistics') : ''}
                icon={<DashboardIcon name={cfg.icon} />}
                onClick={cfg.to ? () => navigate(cfg.to!) : undefined}
              />
            ))}
          </div>
        )}
      />

    </div>
  );
}
