import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { StatusBadge } from '../../../../core/components/StatusBadge';
import { usePermission } from '../../../../core/hooks/usePermission';
import { PERMISSIONS } from '../../../../core/const/permissions';
import { downloadMedicalReportPdf } from '../../../../core/utils/pdfHelper';
import { useClientDetailController } from '../hooks/useClientDetailController';
import './ClientDetailPage.css';

const formatDate = (value: string): string => {
  const date = new Date(value);
  return date.toLocaleDateString();
};

export function ClientDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);
  const { state, refetch } = useClientDetailController(clientId);
  const canExport = usePermission(PERMISSIONS.EXPORT_MEDICAL_RECORDS);

  return (
    <div className="dashboard-page">
      <PageHeader
        title={t('clients.clientDetail')}
        subtitle={t('clients.clientDetails')}
        actions={
          canExport && clientId ? (
            <button className="btn-primary-pill" onClick={() => downloadMedicalReportPdf(clientId)}>
              {t('common.exportPdf')}
            </button>
          ) : undefined
        }
      />

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(client) => (
          <>
            <div className="dashboard-card client-detail-hero">
              <div className="client-detail-avatar" aria-hidden="true">
                {`${client.first_name.charAt(0)}${client.last_name.charAt(0)}`.toUpperCase()}
              </div>
              <div className="client-detail-heading">
                <h2>{client.first_name} {client.last_name}</h2>
                <p className="client-detail-meta">{client.phone} · {client.address}</p>
                <div className="client-detail-badges">
                  <StatusBadge status="normal" label={client.gender} />
                  <StatusBadge status="in_progress" label={client.medical_records.length > 0 ? `${client.medical_records.length} ${t('clients.records')}` : t('clients.noRecords')} />
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="client-detail-section-title">{t('clients.personalDetails')}</h3>
              <dl className="client-detail-list">
                <div className="detail-item"><dt>{t('common.phone')}</dt><dd>{client.phone}</dd></div>
                <div className="detail-item"><dt>{t('common.gender')}</dt><dd>{client.gender}</dd></div>
                <div className="detail-item"><dt>{t('common.birth')}</dt><dd>{formatDate(client.birth)}</dd></div>
                <div className="detail-item"><dt>{t('common.address')}</dt><dd>{client.address}</dd></div>
              </dl>
            </div>

            <div className="dashboard-card">
              <h3 className="client-detail-section-title">{t('clients.medicalRecords')}</h3>
              {client.medical_records.length === 0 ? (
                <p className="list-empty">{t('clients.noMedicalRecords')}</p>
              ) : (
                <ul className="medical-record-list">
                  {client.medical_records.map((record) => (
                    <li key={record.id} className="medical-record-row">
                      <div className="medical-record-head">
                        <StatusBadge status="normal" label={record.type} />
                        <span className="medical-record-date">{formatDate(record.date)}</span>
                      </div>
                      <p className="medical-record-description">{record.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      />
    </div>
  );
}
