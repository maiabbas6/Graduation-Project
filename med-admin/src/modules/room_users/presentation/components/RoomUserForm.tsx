import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { PopupSelect, type PopupSelectOption } from '../../../../core/components/PopupSelect';
import type { RoomModel } from '../../../../core/models/RoomModel';

interface RoomUserFormProps {
  submitLabel: string;
  onSubmit: (userId: number, roomId: number) => void;
  isSubmitting?: boolean;
  users: PopupSelectOption[] | null;
  rooms: RoomModel[] | null;
  isLoadingUsers?: boolean;
  isLoadingRooms?: boolean;
  initialUserId?: number | null;
  initialRoomId?: number | null;
  onCancel?: () => void;
}

export function RoomUserForm({
  submitLabel,
  onSubmit,
  isSubmitting,
  users,
  rooms,
  isLoadingUsers,
  isLoadingRooms,
  initialUserId = null,
  initialRoomId = null,
  onCancel,
}: RoomUserFormProps) {
  const { t } = useTranslation();
  const [userId, setUserId] = useState<number | null>(initialUserId);
  const [roomId, setRoomId] = useState<number | null>(initialRoomId);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userId === null || roomId === null) return;
    onSubmit(userId, roomId);
    setUserId(null);
    setRoomId(null);
  };

  return (
    <form className="room-users-form" onSubmit={handleSubmit}>
      <PopupSelect
        label={t('roomUsers.user')}
        value={userId}
        options={users}
        isLoading={isLoadingUsers}
        onSelect={setUserId}
      />
      <PopupSelect
        label={t('roomUsers.room')}
        value={roomId}
        options={rooms}
        isLoading={isLoadingRooms}
        onSelect={setRoomId}
      />
      <div className="room-users-form-actions">
        <button type="submit" className="filter-button" disabled={isSubmitting || userId === null || roomId === null}>
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="filter-button filter-button-reset" onClick={onCancel}>
            {t('common.cancel')}
          </button>
        )}
      </div>
    </form>
  );
}
