import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { PopupSelect, type PopupSelectOption } from '../../../../core/components/PopupSelect';
import type { RoomModel } from '../../../../core/models/RoomModel';
import type { RoomServiceModel } from '../../../../core/models/RoomServiceModel';

interface RoomServiceUserFormProps {
  submitLabel: string;
  onSubmit: (roomServiceId: number, roomId: number, userId: number, employeeId: number) => void;
  isSubmitting?: boolean;
  roomServices: RoomServiceModel[] | null;
  rooms: RoomModel[] | null;
  users: PopupSelectOption[] | null;
  employees: PopupSelectOption[] | null;
  isLoadingRoomServices?: boolean;
  isLoadingRooms?: boolean;
  isLoadingUsers?: boolean;
  isLoadingEmployees?: boolean;
  initialRoomServiceId?: number | null;
  initialRoomId?: number | null;
  initialUserId?: number | null;
  initialEmployeeId?: number | null;
  onCancel?: () => void;
}

export function RoomServiceUserForm({
  submitLabel,
  onSubmit,
  isSubmitting,
  roomServices,
  rooms,
  users,
  employees,
  isLoadingRoomServices,
  isLoadingRooms,
  isLoadingUsers,
  isLoadingEmployees,
  initialRoomServiceId = null,
  initialRoomId = null,
  initialUserId = null,
  initialEmployeeId = null,
  onCancel,
}: RoomServiceUserFormProps) {
  const { t } = useTranslation();
  const [roomServiceId, setRoomServiceId] = useState<number | null>(initialRoomServiceId);
  const [roomId, setRoomId] = useState<number | null>(initialRoomId);
  const [userId, setUserId] = useState<number | null>(initialUserId);
  const [employeeId, setEmployeeId] = useState<number | null>(initialEmployeeId);

  const isComplete =
    roomServiceId !== null && roomId !== null && userId !== null && employeeId !== null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isComplete) return;
    onSubmit(roomServiceId, roomId, userId, employeeId);
    setRoomServiceId(null);
    setRoomId(null);
    setUserId(null);
    setEmployeeId(null);
  };

  return (
    <form className="room-users-form" onSubmit={handleSubmit}>
      <PopupSelect
        label={t('roomServiceUsers.roomService')}
        value={roomServiceId}
        options={roomServices}
        isLoading={isLoadingRoomServices}
        onSelect={setRoomServiceId}
      />
      <PopupSelect
        label={t('roomServiceUsers.room')}
        value={roomId}
        options={rooms}
        isLoading={isLoadingRooms}
        onSelect={setRoomId}
      />
      <PopupSelect
        label={t('roomServiceUsers.user')}
        value={userId}
        options={users}
        isLoading={isLoadingUsers}
        onSelect={setUserId}
      />
      <PopupSelect
        label={t('roomServiceUsers.employee')}
        value={employeeId}
        options={employees}
        isLoading={isLoadingEmployees}
        onSelect={setEmployeeId}
      />
      <div className="room-users-form-actions">
        <button type="submit" className="filter-button" disabled={isSubmitting || !isComplete}>
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
