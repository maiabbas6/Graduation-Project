import { useCallback, useEffect, useState } from 'react';
import { DataState, DataStatus } from '../../../../core/utils/dataState';
import { handle } from '../../../../core/utils/handler';
import { useSendData } from '../../../../core/hooks/useSendData';
import { roomsDataSource } from '../../data/data_source/RoomsDataSource';
import type { PaginatedRooms, RoomModel } from '../../../../core/models/RoomModel';

export function useRoomsController() {
  const [page, setPage] = useState(1);
  const [state, setState] = useState<DataState<PaginatedRooms>>(
    new DataState<PaginatedRooms>({ status: DataStatus.INIT })
  );

  const load = useCallback(async (target: number) => {
    setState(new DataState<PaginatedRooms>({ status: DataStatus.LOADING }));
    const result = await handle(() => roomsDataSource.getRooms(target));
    setState(result);
  }, []);

  useEffect(() => {
    load(page);
  }, [page, load]);

  const goToPage = (target: number) => {
    if (target >= 1) setPage(target);
  };

  const createRoom = useSendData<RoomModel, { name: string }>(
    ({ name }) => roomsDataSource.createRoom(name),
    { withLoader: true, onSuccess: () => load(page) }
  );

  const updateRoom = useSendData<RoomModel, { id: number; name: string }>(
    ({ id, name }) => roomsDataSource.updateRoom(id, name),
    { withLoader: true, onSuccess: () => load(page) }
  );

  const deleteRoom = useSendData<void, { id: number }>(
    ({ id }) => roomsDataSource.deleteRoom(id),
    { withLoader: true, onSuccess: () => load(page) }
  );

  return { state, page, goToPage, refetch: () => load(page), createRoom, updateRoom, deleteRoom };
}
