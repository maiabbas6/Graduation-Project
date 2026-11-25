import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { StatusBadge, type BadgeStatus } from '../../../../core/components/StatusBadge';
import { useMedicalRecordDetailController } from '../hooks/useMedicalRecordDetailController';
import './MedicalRecordDetailPage.css';

const formatDate = (value: string): string => {
    return new Date(value).toLocaleString();
};

const typeBadge = (type: string): BadgeStatus => {
    switch (type) {
        case 'diagnosis': return 'completed';
        case 'treatment': return 'in_progress';
        case 'consultation': return 'normal';
        case 'follow-up': return 'pending';
        case 'routine-check': return 'normal';
        case 'urgent': return 'high';
        case 'lab': return 'pending';
        case 'radiology': return 'pending';
        default: return 'normal';
    }
};

export function MedicalRecordDetailPage() {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const recordId = Number(id);
    const { state, refetch } = useMedicalRecordDetailController(recordId);

    return (
        <div className="dashboard-page">
            <PageHeader title={t('medicalRecords.recordDetail')} subtitle={t('medicalRecords.recordDetails')} />

            <StatusComponent
                state={state}
                onError={(message) => (
                    <div className="dashboard-card dashboard-error">
                        <p>{message}</p>
                        <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
                    </div>
                )}
                onSuccess={(record) => (
                    <>
                        <div className="dashboard-card">
                            <div className="mr-detail-head">
                                <h2 className="mr-detail-title">{t('medicalRecords.record')} #{record.id}</h2>
                                <StatusBadge status={typeBadge(record.type)} label={record.type} />
                            </div>

                            <dl className="mr-detail-list">
                                <div className="detail-item"><dt>{t('common.id')}</dt><dd>#{record.id}</dd></div>
                                <div className="detail-item"><dt>{t('medicalRecords.date')}</dt><dd>{formatDate(record.date)}</dd></div>
                                <div className="detail-item"><dt>{t('medicalRecords.type')}</dt><dd>{record.type}</dd></div>
                                <div className="detail-item"><dt>{t('medicalRecords.client')}</dt><dd>{record.user.first_name} {record.user.last_name}</dd></div>
                                <div className="detail-item"><dt>{t('common.phone')}</dt><dd>{record.user.phone}</dd></div>
                                <div className="detail-item"><dt>{t('medicalRecords.employee')}</dt><dd>Dr. {record.employee.user.first_name} {record.employee.user.last_name}</dd></div>
                                <div className="detail-item"><dt>{t('medicalRecords.specialization')}</dt><dd>{record.employee.specialization}</dd></div>
                                <div className="detail-item"><dt>{t('medicalRecords.description')}</dt><dd>{record.description}</dd></div>
                            </dl>
                        </div>

                        {record.attatchments && record.attatchments.length > 0 && (
                            <div className="dashboard-card">
                                <h3 className="mr-detail-section">{t('medicalRecords.attachments')}</h3>
                                <ul className="mr-attachments-list">
                                    {record.attatchments.map((att) => (
                                        <li key={att.id} className="mr-attachment-item">
                                            <a href={att.path} target="_blank" rel="noopener noreferrer">
                                                {t('common.attached')} #{att.id}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            />
        </div>
    );
}
