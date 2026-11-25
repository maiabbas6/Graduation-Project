import { useLoadData } from '../../../../core/hooks/useLoadData';
import { useSendData } from '../../../../core/hooks/useSendData';
import type { PopupSelectOption } from '../../../../core/components/PopupSelect';
import type { RoomModel } from '../../../../core/models/RoomModel';
import type { RoomServiceModel } from '../../../../core/models/RoomServiceModel';
import type { RoomServiceUserModel, RoomServiceUserStatus } from '../../../../core/models/RoomServiceUserModel';
import { roomServiceUsersDataSource } from '../../data/data_source/RoomServiceUsersDataSource';

export function useRoomServiceUsersController() {
  const { state, refetch } = useLoadData<RoomServiceUserModel[]>(() => roomServiceUsersDataSource.getRoomServiceUsers());

  const roomServices = useLoadData<RoomServiceModel[]>(() => roomServiceUsersDataSource.getRoomServices());
  const rooms = useLoadData<RoomModel[]>(() => roomServiceUsersDataSource.getRooms());
  const users = useLoadData<PopupSelectOption[]>(() => roomServiceUsersDataSource.getUsers());
  const employees = useLoadData<PopupSelectOption[]>(() => roomServiceUsersDataSource.getEmployees());

  const createRoomServiceUser = useSendData<
    RoomServiceUserModel,
    { roomServiceId: number; roomId: number; userId: number; employeeId: number }
  >(
    ({ roomServiceId, roomId, userId, employeeId }) =>
      roomServiceUsersDataSource.createRoomServiceUser(roomServiceId, roomId, userId, employeeId),
    { withLoader: true, onSuccess: () => refetch() }
  );

  const updateRoomServiceUser = useSendData<
    RoomServiceUserModel,
    { id: number; roomServiceId: number; roomId: number; userId: number; employeeId: number }
  >(
    ({ id, roomServiceId, roomId, userId, employeeId }) =>
      roomServiceUsersDataSource.updateRoomServiceUser(id, roomServiceId, roomId, userId, employeeId),
    { withLoader: true, onSuccess: () => refetch() }
  );

  const deleteRoomServiceUser = useSendData<void, { id: number }>(
    ({ id }) => roomServiceUsersDataSource.deleteRoomServiceUser(id),
    { withLoader: true, onSuccess: () => refetch() }
  );

  const changeStatus = useSendData<void, { id: number; status: RoomServiceUserStatus }>(
    ({ id, status }) => roomServiceUsersDataSource.changeStatus(id, status),
    { withLoader: true, onSuccess: () => refetch() }
  );

  return {
    state,
    refetch,
    roomServices,
    rooms,
    users,
    employees,
    createRoomServiceUser,
    updateRoomServiceUser,
    deleteRoomServiceUser,
    changeStatus,
  };
}