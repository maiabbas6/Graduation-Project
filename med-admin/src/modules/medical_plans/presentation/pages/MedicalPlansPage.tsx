import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { Pagination } from '../../../../core/components/Pagination';
import { Modal } from '../../../../core/components/Modal';
import { usePermission } from '../../../../core/hooks/usePermission';
import { PERMISSIONS } from '../../../../core/const/permissions';
import { downloadMedicalReportPdf } from '../../../../core/utils/pdfHelper';
import { useMedicalPlansController } from '../hooks/useMedicalPlansController';
import { MedicalPlansList } from '../components/MedicalPlansList';

export function MedicalPlansPage() {
    const { t } = useTranslation();
    const { state, page, userId, clients, setUserId, goToPage, refetch } = useMedicalPlansController();
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const canExport = usePermission(PERMISSIONS.EXPORT_MEDICAL_PLANS);

    const selectedClient = clients.isSuccess ? clients.state.data?.find(c => c.id === userId) : null;

    const handleExport = () => {
        if (userId) {
            downloadMedicalReportPdf(userId);
        }
    };

    return (
        <div className="dashboard-page">
            <PageHeader
                title={t('medicalPlans.title')}
                subtitle={t('medicalPlans.subtitle')}
                actions={
                    canExport && userId ? (
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
                </div>
            </div>

            <StatusComponent
                state={state}
                onError={(message) => (
                    <div className="dashboard-card dashboard-error">
                        <p>{message}</p>
                        <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
                    </div>
                )}
                onSuccess={(result) => (
                    <>
                        <div className="dashboard-card">
                            <MedicalPlansList plans={result.data} />
                        </div>
                        <Pagination
                            currentPage={result.current_page}
                            lastPage={result.last_page}
                            onChange={goToPage}
                        />
                    </>
                )}
            />

            <Modal isOpen={isClientModalOpen} onClose={() => setIsClientModalOpen(false)} title={t('medicalRecords.selectClient')}>
                <ul className="selection-list">
                    <li onClick={() => { setUserId(undefined); setIsClientModalOpen(false); }}>{t('common.all')}</li>
                    {clients.isSuccess && clients.state.data?.map(c => (
                        <li key={c.id} onClick={() => { setUserId(c.id); setIsClientModalOpen(false); }}>{c.name}</li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
}
