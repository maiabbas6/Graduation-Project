import { useLoadData } from '../../../../core/hooks/useLoadData';
import { useSendData } from '../../../../core/hooks/useSendData';
import { roomServicesDataSource } from '../../data/data_source/RoomServicesDataSource';
import type { RoomServiceModel } from '../../../../core/models/RoomServiceModel';

export function useRoomServicesController() {
  const { state, refetch } = useLoadData<RoomServiceModel[]>(() => roomServicesDataSource.getRoomServices());

  const createRoomService = useSendData<RoomServiceModel, { name: string; price: string }>(
    ({ name, price }) => roomServicesDataSource.createRoomService(name, price),
    { withLoader: true, onSuccess: () => refetch() }
  );

  const updateRoomService = useSendData<RoomServiceModel, { id: number; name: string; price: string }>(
    ({ id, name, price }) => roomServicesDataSource.updateRoomService(id, name, price),
    { withLoader: true, onSuccess: () => refetch() }
  );

  const deleteRoomService = useSendData<void, { id: number }>(
    ({ id }) => roomServicesDataSource.deleteRoomService(id),
    { withLoader: true, onSuccess: () => refetch() }
  );

  return { state, refetch, createRoomService, updateRoomService, deleteRoomService };
}