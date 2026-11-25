import { useLoadData } from '../../../../core/hooks/useLoadData';
import { roomUsersDataSource } from '../../data/data_source/RoomUsersDataSource';
import type { RoomUserModel } from '../../../../core/models/RoomUserModel';

export function useRoomUserDetailController(id: number) {
  const { state, refetch, isLoading, isSuccess, isError } = useLoadData<RoomUserModel>(() =>
    roomUsersDataSource.getRoomUser(id)
  );

  return { state, refetch, isLoading, isSuccess, isError };
}