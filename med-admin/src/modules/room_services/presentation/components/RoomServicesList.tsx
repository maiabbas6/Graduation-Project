import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { RoomServiceModel } from '../../../../core/models/RoomServiceModel';

interface RoomServicesListProps {
  services: RoomServiceModel[];
  isDeleting: boolean;
  isUpdating: boolean;
  onUpdate: (id: number, name: string, price: string) => void;
  onDelete: (id: number) => void;
}

export function RoomServicesList({ services, isDeleting, isUpdating, onUpdate, onDelete }: RoomServicesListProps) {
  const { t } = useTranslation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  const startEdit = (service: RoomServiceModel) => {
    setEditingId(service.id);
    setEditName(service.name);
    setEditPrice(service.price);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>, service: RoomServiceModel) => {
    event.preventDefault();
    const trimmedName = editName.trim();
    const trimmedPrice = editPrice.trim();
    if (!trimmedName || !trimmedPrice) return;
    onUpdate(service.id, trimmedName, trimmedPrice);
    setEditingId(null);
    setEditName('');
    setEditPrice('');
  };

  if (!services || services.length === 0) {
    return <p className="list-empty">{t('roomServices.noRoomServices')}</p>;
  }

  return (
    <ul className="room-list">
      {services.map((service) => (
        <li key={service.id} className="room-row">
          {editingId === service.id ? (
            <form className="room-form room-form-inline" onSubmit={(event) => handleSubmit(event, service)}>
              <input
                type="text"
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
                autoFocus
              />
              <input
                type="text"
                inputMode="decimal"
                value={editPrice}
                onChange={(event) => setEditPrice(event.target.value)}
              />
              <button type="submit" className="filter-button" disabled={isUpdating}>
                {t('common.save')}
              </button>
              <button type="button" className="filter-button filter-button-reset" onClick={() => setEditingId(null)}>
                {t('common.cancel')}
              </button>
            </form>
          ) : (
            <>
              <strong className="room-name">{service.name}</strong>
              <span className="room-service-price">${service.price}</span>
              <div className="room-actions">
                <Link className="room-btn room-btn-edit" to={`/room-services/${service.id}`}>{t('common.view')}</Link>
                <button type="button" className="room-btn room-btn-edit" onClick={() => startEdit(service)}>
                  {t('common.edit')}
                </button>
                <button
                  type="button"
                  className="room-btn room-btn-delete"
                  onClick={() => onDelete(service.id)}
                  disabled={isDeleting}
                >
                  {t('common.delete')}
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
