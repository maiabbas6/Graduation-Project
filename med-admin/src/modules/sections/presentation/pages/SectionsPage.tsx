import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { useSectionsController } from '../hooks/useSectionsController';
import { SectionsList } from '../components/SectionsList';

export function SectionsPage() {
  const { t } = useTranslation();
  const { state, refetch } = useSectionsController();

  return (
    <div className="dashboard-page">
      <PageHeader title={t('sections.title')} subtitle={t('sections.subtitle')} />

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(sections) => (
          <div className="dashboard-card">
            <SectionsList sections={sections} />
          </div>
        )}
      />
    </div>
  );
}
