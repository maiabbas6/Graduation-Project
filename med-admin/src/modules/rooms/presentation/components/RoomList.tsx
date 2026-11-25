import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { RoomModel } from '../../../../core/models/RoomModel';

interface RoomListProps {
  rooms: RoomModel[];
  isDeleting: boolean;
  isUpdating: boolean;
  onUpdate: (room: RoomModel) => void;
  onDelete: (id: number) => void;
}

export function RoomList({ rooms, isDeleting, isUpdating, onUpdate, onDelete }: RoomListProps) {
  const { t } = useTranslation();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (room: RoomModel) => {
    setEditingId(room.id);
    setEditValue(room.name);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>, room: RoomModel) => {
    event.preventDefault();
    const trimmed = editValue.trim();
    if (!trimmed) return;
    onUpdate({ ...room, name: trimmed });
    setEditingId(null);
    setEditValue('');
  };

  if (!rooms || rooms.length === 0) {
    return <p className="list-empty">{t('rooms.noRooms')}</p>;
  }

  return (
    <ul className="room-list">
      {rooms.map((room) => (
        <li key={room.id} className="room-row">
          {editingId === room.id ? (
            <form className="room-form room-form-inline" onSubmit={(event) => handleSubmit(event, room)}>
              <input
                type="text"
                value={editValue}
                onChange={(event) => setEditValue(event.target.value)}
                autoFocus
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
              <strong className="room-name">{room.name}</strong>
              <div className="room-actions">
                <Link className="room-btn room-btn-edit" to={`/rooms/${room.id}`}>{t('common.view')}</Link>
                <button type="button" className="room-btn room-btn-edit" onClick={() => startEdit(room)}>
                  {t('common.edit')}
                </button>
                <button
                  type="button"
                  className="room-btn room-btn-delete"
                  onClick={() => onDelete(room.id)}
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
