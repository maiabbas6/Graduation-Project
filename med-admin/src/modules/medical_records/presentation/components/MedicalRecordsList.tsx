import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { StatusBadge, type BadgeStatus } from '../../../../core/components/StatusBadge';
import type { MedicalRecordModel } from '../../data/models/MedicalRecordModel';
import './MedicalRecordsList.css';

interface MedicalRecordsListProps {
    records: MedicalRecordModel[];
}

const formatDate = (value: string): string => {
    return new Date(value).toLocaleDateString();
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

export function MedicalRecordsList({ records }: MedicalRecordsListProps) {
    const { t } = useTranslation();

    if (!records || records.length === 0) {
        return <p className="list-empty">{t('medicalRecords.noRecords')}</p>;
    }

    return (
        <ul className="mr-list">
            {records.map((record) => (
                <li key={record.id} className="mr-row">
                    <div className="mr-info">
                        <div className="mr-head">
                            <StatusBadge status={typeBadge(record.type)} label={record.type} />
                            <span className="mr-date">{formatDate(record.date)}</span>
                        </div>
                        <span className="mr-user">
                            {record.user.first_name} {record.user.last_name}
                        </span>
                        <span className="mr-employee">
                            Dr. {record.employee.user.first_name} {record.employee.user.last_name} · {record.employee.specialization}
                        </span>
                        {record.description && (
                            <span className="mr-desc">{record.description}</span>
                        )}
                    </div>
                    <Link to={`/medical-records/${record.id}`} className="mr-view">
                        {t('common.view')}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
