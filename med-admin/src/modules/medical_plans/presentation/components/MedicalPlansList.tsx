import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { MedicalPlanModel } from '../../data/models/MedicalPlanModel';
import './MedicalPlansList.css';

interface MedicalPlansListProps {
    plans: MedicalPlanModel[];
}

const formatDate = (value: string): string => {
    return new Date(value).toLocaleDateString();
};

export function MedicalPlansList({ plans }: MedicalPlansListProps) {
    const { t } = useTranslation();

    if (!plans || plans.length === 0) {
        return <p className="list-empty">{t('medicalPlans.noPlans')}</p>;
    }

    return (
        <ul className="mp-list">
            {plans.map((plan) => (
                <li key={plan.id} className="mp-row">
                    <div className="mp-info">
                        <strong className="mp-title">{plan.title}</strong>
                        <span className="mp-employee">
                            Dr. {plan.employee.user.first_name} {plan.employee.user.last_name} · {plan.employee.specialization}
                        </span>
                        <span className="mp-date">{formatDate(plan.created_at)}</span>
                        {plan.description && (
                            <span className="mp-desc">{plan.description}</span>
                        )}
                    </div>
                    <Link to={`/medical-plans/${plan.id}`} className="mp-view">
                        {t('common.view')}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
