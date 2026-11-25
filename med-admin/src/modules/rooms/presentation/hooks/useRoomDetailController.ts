import { useLoadData } from '../../../../core/hooks/useLoadData';
import { roomsDataSource } from '../../data/data_source/RoomsDataSource';
import type { RoomDetailModel } from '../../../../core/models/RoomModel';

export function useRoomDetailController(id: number) {
  const { state, refetch, isLoading, isSuccess, isError } = useLoadData<RoomDetailModel>(() =>
    roomsDataSource.getRoom(id)
  );

  return { state, refetch, isLoading, isSuccess, isError };
}