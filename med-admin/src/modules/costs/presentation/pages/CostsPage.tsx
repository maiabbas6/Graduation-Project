import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { useCostsController } from '../hooks/useCostsController';
import { CostsList } from '../components/CostsList';

export function CostsPage() {
    const { t } = useTranslation();
    const { state, refetch } = useCostsController();

    return (
        <div className="dashboard-page">
            <PageHeader title={t('costs.title')} subtitle={t('costs.subtitle')} />

            <StatusComponent
                state={state}
                onError={(message) => (
                    <div className="dashboard-card dashboard-error">
                        <p>{message}</p>
                        <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
                    </div>
                )}
                onSuccess={(costs) => (
                    <div className="dashboard-card">
                        <CostsList costs={costs} />
                    </div>
                )}
            />
        </div>
    );
}
