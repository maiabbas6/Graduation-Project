import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { StatusBadge, type BadgeStatus } from '../../../../core/components/StatusBadge';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { ApiConst } from '../../../../core/const/ApiConst';
import { useCostDetailController } from '../hooks/useCostDetailController';
import './CostDetailPage.css';

const formatDate = (value: string | null): string => {
    if (!value) return '—';
    return new Date(value).toLocaleString();
};

const statusBadge = (status: string): BadgeStatus => {
    switch (status) {
        case 'paid':
            return 'completed';
        case 'unpaid':
            return 'high';
        default:
            return 'normal';
    }
};

export function CostDetailPage() {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const costId = Number(id);
    const { state, refetch, markAsPaid, markAsUnpaid } = useCostDetailController(costId);

    const handleExportPdf = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(ApiConst.costExportPdf(costId), {
            headers: { Authorization: `Bearer ${token}` },
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cost-${costId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="dashboard-page">
            <PageHeader title={t('costs.costDetail')} subtitle={t('costs.costDetails')} />

            <StatusComponent
                state={state}
                onError={(message) => (
                    <div className="dashboard-card dashboard-error">
                        <p>{message}</p>
                        <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
                    </div>
                )}
                onSuccess={(cost) => (
                    <div className="dashboard-card">
                        <div className="cost-detail-head">
                            <h2 className="cost-detail-title">{cost.description}</h2>
                            <StatusBadge status={statusBadge(cost.status)} label={cost.status} />
                        </div>

                        <dl className="cost-detail-list">
                            <div className="detail-item"><dt>{t('common.id')}</dt><dd>#{cost.id}</dd></div>
                            <div className="detail-item"><dt>{t('costs.user')}</dt><dd>{cost.user.first_name} {cost.user.last_name}</dd></div>
                            <div className="detail-item"><dt>{t('common.phone')}</dt><dd>{cost.user.phone}</dd></div>
                            <div className="detail-item"><dt>{t('costs.amount')}</dt><dd>{cost.amount.toLocaleString()}</dd></div>
                            <div className="detail-item"><dt>{t('common.status')}</dt><dd>{cost.status}</dd></div>
                            <div className="detail-item"><dt>{t('costs.paidAt')}</dt><dd>{formatDate(cost.paid_at)}</dd></div>
                            <div className="detail-item"><dt>{t('costs.appointment')}</dt><dd>{cost.appointment_id ? `#${cost.appointment_id}` : '—'}</dd></div>
                        </dl>

                        <div className="cost-detail-actions">
                            {cost.status !== 'paid' ? (
                                <button
                                    type="button"
                                    className="btn-primary-pill"
                                    disabled={markAsPaid.isSubmitting}
                                    onClick={() => markAsPaid.sendData({ id: costId })}
                                >
                                    {markAsPaid.isSubmitting ? t('common.saving') : t('costs.markAsPaid')}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn-outline"
                                    disabled={markAsUnpaid.isSubmitting}
                                    onClick={() => markAsUnpaid.sendData({ id: costId })}
                                >
                                    {markAsUnpaid.isSubmitting ? t('common.saving') : t('costs.markAsUnpaid')}
                                </button>
                            )}
                            <button type="button" className="btn-outline" onClick={handleExportPdf}>
                                {t('costs.exportPdf')}
                            </button>
                        </div>

                        {cost.appointment_id ? (
                            <Link className="cost-detail-appointment" to={`/appointments/${cost.appointment_id}`}>
                                {t('costs.viewAppointment')}
                            </Link>
                        ) : null}
                    </div>
                )}
            />
        </div>
    );
}
