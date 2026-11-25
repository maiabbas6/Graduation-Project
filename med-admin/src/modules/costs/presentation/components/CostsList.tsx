import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StatusBadge, type BadgeStatus } from '../../../../core/components/StatusBadge';
import type { CostModel } from '../../../../core/models/CostModel';
import './CostsList.css';

interface CostsListProps {
    costs: CostModel[];
}

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

const formatAmount = (value: number): string => {
    return value.toLocaleString();
};

const formatDate = (value: string | null): string => {
    if (!value) return '—';
    return new Date(value).toLocaleString();
};

export function CostsList({ costs }: CostsListProps) {
    const { t } = useTranslation();

    if (!costs || costs.length === 0) {
        return <p className="list-empty">{t('costs.noCosts')}</p>;
    }

    return (
        <ul className="cost-list">
            {costs.map((cost) => (
                <li key={cost.id} className="cost-row">
                    <div className="cost-head">
                        <Link className="cost-description" to={`/costs/${cost.id}`}>{cost.description}</Link>
                        <StatusBadge status={statusBadge(cost.status)} label={cost.status} />
                    </div>
                    <div className="cost-meta">
                        <span>{cost.user.first_name} {cost.user.last_name}</span>
                        <span className="cost-amount">{formatAmount(cost.amount)}</span>
                    </div>
                    <div className="cost-footer">
                        <span>{t('costs.paidAt')}: {formatDate(cost.paid_at)}</span>
                        {cost.appointment_id ? (
                            <Link className="cost-appointment-link" to={`/appointments/${cost.appointment_id}`}>
                                {t('costs.viewAppointment')}
                            </Link>
                        ) : null}
                    </div>
                </li>
            ))}
        </ul>
    );
}
