import { useLoadData } from '../../../../core/hooks/useLoadData';
import { roomServicesDataSource } from '../../data/data_source/RoomServicesDataSource';
import type { RoomServiceModel } from '../../../../core/models/RoomServiceModel';

export function useRoomServiceDetailController(id: number) {
  const { state, refetch, isLoading, isSuccess, isError } = useLoadData<RoomServiceModel>(() =>
    roomServicesDataSource.getRoomService(id)
  );

  return { state, refetch, isLoading, isSuccess, isError };
}