import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { useMedicalPlanDetailController } from '../hooks/useMedicalPlanDetailController';
import './MedicalPlanDetailPage.css';

const formatDate = (value: string): string => {
    return new Date(value).toLocaleString();
};

export function MedicalPlanDetailPage() {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const planId = Number(id);
    const { state, refetch } = useMedicalPlanDetailController(planId);

    return (
        <div className="dashboard-page">
            <PageHeader title={t('medicalPlans.planDetail')} subtitle={t('medicalPlans.planDetails')} />

            <StatusComponent
                state={state}
                onError={(message) => (
                    <div className="dashboard-card dashboard-error">
                        <p>{message}</p>
                        <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
                    </div>
                )}
                onSuccess={(plan) => (
                    <>
                        <div className="dashboard-card">
                            <h2 className="mp-detail-title">{plan.title}</h2>
                            <p className="mp-detail-id">#{plan.id}</p>

                            <dl className="mp-detail-list">
                                <div className="detail-item"><dt>{t('common.id')}</dt><dd>#{plan.id}</dd></div>
                                <div className="detail-item"><dt>{t('medicalPlans.employee')}</dt><dd>Dr. {plan.employee.user.first_name} {plan.employee.user.last_name}</dd></div>
                                <div className="detail-item"><dt>{t('medicalPlans.specialization')}</dt><dd>{plan.employee.specialization}</dd></div>
                                <div className="detail-item"><dt>{t('medicalPlans.createdAt')}</dt><dd>{formatDate(plan.created_at)}</dd></div>
                            </dl>
                        </div>

                        <div className="dashboard-card">
                            <h3 className="mp-detail-section">{t('medicalPlans.description')}</h3>
                            <p className="mp-detail-description">{plan.description}</p>
                        </div>

                        {plan.medical_record && (
                            <div className="dashboard-card">
                                <h3 className="mp-detail-section">{t('medicalPlans.linkedRecord')}</h3>
                                <dl className="mp-detail-list">
                                    <div className="detail-item"><dt>{t('medicalPlans.recordId')}</dt><dd>#{plan.medical_record.id}</dd></div>
                                    <div className="detail-item"><dt>{t('medicalPlans.recordDate')}</dt><dd>{formatDate(plan.medical_record.date)}</dd></div>
                                    <div className="detail-item"><dt>{t('medicalPlans.recordType')}</dt><dd>{plan.medical_record.type}</dd></div>
                                </dl>
                            </div>
                        )}
                    </>
                )}
            />
        </div>
    );
}
