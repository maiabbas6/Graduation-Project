import { useLoadData } from '../../../../core/hooks/useLoadData';
import { useSendData } from '../../../../core/hooks/useSendData';
import type { PopupSelectOption } from '../../../../core/components/PopupSelect';
import type { RoomModel } from '../../../../core/models/RoomModel';
import type { RoomUserModel } from '../../../../core/models/RoomUserModel';
import { roomUsersDataSource } from '../../data/data_source/RoomUsersDataSource';

export function useRoomUsersController() {
  const { state, refetch } = useLoadData<RoomUserModel[]>(() => roomUsersDataSource.getRoomUsers());

  const users = useLoadData<PopupSelectOption[]>(() => roomUsersDataSource.getUsers());
  const rooms = useLoadData<RoomModel[]>(() => roomUsersDataSource.getRooms());

  const createRoomUser = useSendData<RoomUserModel, { userId: number; roomId: number }>(
    ({ userId, roomId }) => roomUsersDataSource.createRoomUser(userId, roomId),
    { withLoader: true, onSuccess: () => refetch() }
  );

  const updateRoomUser = useSendData<RoomUserModel, { id: number; userId: number; roomId: number }>(
    ({ id, userId, roomId }) => roomUsersDataSource.updateRoomUser(id, userId, roomId),
    { withLoader: true, onSuccess: () => refetch() }
  );

  const deleteRoomUser = useSendData<void, { id: number }>(
    ({ id }) => roomUsersDataSource.deleteRoomUser(id),
    { withLoader: true, onSuccess: () => refetch() }
  );

  return {
    state,
    refetch,
    users,
    rooms,
    createRoomUser,
    updateRoomUser,
    deleteRoomUser,
  };
}