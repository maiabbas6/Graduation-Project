import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { Modal } from '../../../../core/components/Modal';
import { usePermission } from '../../../../core/hooks/usePermission';
import { PERMISSIONS } from '../../../../core/const/permissions';
import { downloadMedicalReportPdf } from '../../../../core/utils/pdfHelper';
import { useMedicalRecordsController } from '../hooks/useMedicalRecordsController';
import { MedicalRecordsList } from '../components/MedicalRecordsList';
import './MedicalRecordsPage.css';

const recordTypes = [
    'lab', 'radiology', 'treatment', 'consultation', 'diagnosis', 'follow-up', 'routine-check', 'urgent'
];

export function MedicalRecordsPage() {
    const { t } = useTranslation();
    const { state, filters, clients, employees, applyFilters, resetFilters, refetch } = useMedicalRecordsController();
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
    const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
    const canExport = usePermission(PERMISSIONS.EXPORT_MEDICAL_RECORDS);

    const selectedClient = clients.isSuccess ? clients.state.data?.find(c => c.id === filters.user_id) : null;
    const selectedEmployee = employees.isSuccess ? employees.state.data?.find(e => e.id === filters.employee_id) : null;

    const handleExport = () => {
        if (filters.user_id) {
            downloadMedicalReportPdf(filters.user_id);
        }
    };

    return (
        <div className="dashboard-page">
            <PageHeader
                title={t('medicalRecords.title')}
                subtitle={t('medicalRecords.subtitle')}
                actions={
                    canExport && filters.user_id ? (
                        <button className="btn-primary-pill" onClick={handleExport}>
                            {t('common.exportPdf')}
                        </button>
                    ) : undefined
                }
            />

            <div className="dashboard-card filter-summary-bar">
                <div className="filter-summary">
                    <div className="filter-item">
                        <span>{t('medicalRecords.client')} {selectedClient?.name || t('common.all')}</span>
                        <button className="btn-outline" onClick={() => setIsClientModalOpen(true)}>{t('common.change')}</button>
                    </div>
                    <div className="filter-item">
                        <span>{t('medicalRecords.employee')} {selectedEmployee?.name || t('common.all')}</span>
                        <button className="btn-outline" onClick={() => setIsEmployeeModalOpen(true)}>{t('common.change')}</button>
                    </div>
                    <div className="filter-item">
                        <span>{t('medicalRecords.type')} {filters.type || t('common.all')}</span>
                        <button className="btn-outline" onClick={() => setIsTypeModalOpen(true)}>{t('common.change')}</button>
                    </div>
                    <div className="filter-item">
                        <label>{t('medicalRecords.startDate')}</label>
                        <input
                            type="date"
                            value={filters.start_date || ''}
                            onChange={(e) => applyFilters({ ...filters, start_date: e.target.value || undefined })}
                        />
                    </div>
                    <div className="filter-item">
                        <label>{t('medicalRecords.endDate')}</label>
                        <input
                            type="date"
                            value={filters.end_date || ''}
                            onChange={(e) => applyFilters({ ...filters, end_date: e.target.value || undefined })}
                        />
                    </div>
                </div>
                <button className="filter-button-reset" onClick={resetFilters}>{t('common.reset')}</button>
            </div>

            <StatusComponent
                state={state}
                onError={(message) => (
                    <div className="dashboard-card dashboard-error">
                        <p>{message}</p>
                        <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
                    </div>
                )}
                onSuccess={(records) => (
                    <div className="dashboard-card">
                        <MedicalRecordsList records={records} />
                    </div>
                )}
            />

            <Modal isOpen={isClientModalOpen} onClose={() => setIsClientModalOpen(false)} title={t('medicalRecords.selectClient')}>
                <ul className="selection-list">
                    <li onClick={() => { applyFilters({ ...filters, user_id: undefined }); setIsClientModalOpen(false); }}>{t('common.all')}</li>
                    {clients.isSuccess && clients.state.data?.map(c => (
                        <li key={c.id} onClick={() => { applyFilters({ ...filters, user_id: c.id }); setIsClientModalOpen(false); }}>{c.name}</li>
                    ))}
                </ul>
            </Modal>

            <Modal isOpen={isEmployeeModalOpen} onClose={() => setIsEmployeeModalOpen(false)} title={t('medicalRecords.selectEmployee')}>
                <ul className="selection-list">
                    <li onClick={() => { applyFilters({ ...filters, employee_id: undefined }); setIsEmployeeModalOpen(false); }}>{t('common.all')}</li>
                    {employees.isSuccess && employees.state.data?.map(e => (
                        <li key={e.id} onClick={() => { applyFilters({ ...filters, employee_id: e.id }); setIsEmployeeModalOpen(false); }}>{e.name}</li>
                    ))}
                </ul>
            </Modal>

            <Modal isOpen={isTypeModalOpen} onClose={() => setIsTypeModalOpen(false)} title={t('medicalRecords.selectType')}>
                <ul className="selection-list">
                    <li onClick={() => { applyFilters({ ...filters, type: undefined }); setIsTypeModalOpen(false); }}>{t('common.all')}</li>
                    {recordTypes.map((type) => (
                        <li key={type} onClick={() => { applyFilters({ ...filters, type: type as any }); setIsTypeModalOpen(false); }}>{type}</li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
}
