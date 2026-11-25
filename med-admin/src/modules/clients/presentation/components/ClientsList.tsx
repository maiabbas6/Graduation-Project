import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { ClientModel } from '../../data/models/ClientModel';
import './ClientsList.css';

interface ClientsListProps {
  clients: ClientModel[];
}

const initials = (client: ClientModel): string => {
  return `${client.first_name.charAt(0)}${client.last_name.charAt(0)}`.toUpperCase();
};

export function ClientsList({ clients }: ClientsListProps) {
  const { t } = useTranslation();

  if (!clients || clients.length === 0) {
    return <p className="list-empty">{t('clients.noClients')}</p>;
  }

  return (
    <ul className="client-list">
      {clients.map((client) => (
        <li key={client.id} className="client-row">
          <Link className="client-link" to={`/clients/${client.id}`}>
            <div className="client-avatar" aria-hidden="true">
              {initials(client)}
            </div>
            <div className="client-info">
              <strong className="client-name">
                {client.first_name} {client.last_name}
              </strong>
              <span className="client-meta">
                {client.phone} · {client.address}
              </span>
            </div>
            <div className="client-stats">
              <span className="client-stat">{t('clients.appointmentsLabel')} <strong>{client.appointments_count}</strong></span>
              <span className="client-stat">{t('clients.recordsLabel')} <strong>{client.medical_records_count}</strong></span>
              <span className="client-stat">{t('clients.chatsLabel')} <strong>{client.chats_count}</strong></span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
