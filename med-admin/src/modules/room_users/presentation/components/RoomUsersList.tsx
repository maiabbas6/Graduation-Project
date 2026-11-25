import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { PopupSelectOption } from '../../../../core/components/PopupSelect';
import type { RoomModel } from '../../../../core/models/RoomModel';
import type { RoomUserModel } from '../../../../core/models/RoomUserModel';
import { RoomUserForm } from './RoomUserForm';

interface RoomUsersListProps {
  roomUsers: RoomUserModel[];
  users: PopupSelectOption[] | null;
  rooms: RoomModel[] | null;
  isLoadingUsers: boolean;
  isLoadingRooms: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  onUpdate: (id: number, userId: number, roomId: number) => void;
  onDelete: (id: number) => void;
}

const userLabel = (roomUser: RoomUserModel): string => {
  if (roomUser.user?.first_name) {
    return `${roomUser.user.first_name} ${roomUser.user.last_name ?? ''}`.trim();
  }
  return `User #${roomUser.user_id}`;
};

const roomLabel = (roomUser: RoomUserModel): string => {
  if (roomUser.room?.name) {
    return roomUser.room.name;
  }
  return `Room #${roomUser.room_id}`;
};

export function RoomUsersList({
  roomUsers,
  users,
  rooms,
  isLoadingUsers,
  isLoadingRooms,
  isDeleting,
  isUpdating,
  onUpdate,
  onDelete,
}: RoomUsersListProps) {
  const { t } = useTranslation();
  const [editingId, setEditingId] = useState<number | null>(null);

  if (!roomUsers || roomUsers.length === 0) {
    return <p className="list-empty">{t('roomUsers.noRoomUsers')}</p>;
  }

  return (
    <ul className="room-list">
      {roomUsers.map((roomUser) => (
        <li key={roomUser.id} className="room-row">
          {editingId === roomUser.id ? (
            <RoomUserForm
              submitLabel={t('common.save')}
              onSubmit={(userId, roomId) => {
                onUpdate(roomUser.id, userId, roomId);
                setEditingId(null);
              }}
              isSubmitting={isUpdating}
              users={users}
              rooms={rooms}
              isLoadingUsers={isLoadingUsers}
              isLoadingRooms={isLoadingRooms}
              initialUserId={roomUser.user_id}
              initialRoomId={roomUser.room_id}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              <strong className="room-name">{userLabel(roomUser)}</strong>
              <span className="room-user-room">{roomLabel(roomUser)}</span>
              <div className="room-actions">
                <Link className="room-btn room-btn-edit" to={`/room-users/${roomUser.id}`}>{t('common.view')}</Link>
                <button type="button" className="room-btn room-btn-edit" onClick={() => setEditingId(roomUser.id)}>
                  {t('common.edit')}
                </button>
                <button
                  type="button"
                  className="room-btn room-btn-delete"
                  onClick={() => onDelete(roomUser.id)}
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
