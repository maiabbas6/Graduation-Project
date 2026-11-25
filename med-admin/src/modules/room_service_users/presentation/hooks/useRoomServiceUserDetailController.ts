import { useLoadData } from '../../../../core/hooks/useLoadData';
import { roomServiceUsersDataSource } from '../../data/data_source/RoomServiceUsersDataSource';
import type { RoomServiceUserModel } from '../../../../core/models/RoomServiceUserModel';

export function useRoomServiceUserDetailController(id: number) {
  const { state, refetch, isLoading, isSuccess, isError } = useLoadData<RoomServiceUserModel>(() =>
    roomServiceUsersDataSource.getRoomServiceUser(id)
  );

  return { state, refetch, isLoading, isSuccess, isError };
}