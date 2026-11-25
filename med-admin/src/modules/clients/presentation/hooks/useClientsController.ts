import { useCallback, useEffect, useState } from 'react';
import { DataState, DataStatus } from '../../../../core/utils/dataState';
import { handle } from '../../../../core/utils/handler';
import { clientsDataSource } from '../../data/data_source/ClientsDataSource';
import type { PaginatedClients } from '../../data/models/ClientModel';

export function useClientsController() {
  const [page, setPage] = useState(1);
  const [state, setState] = useState<DataState<PaginatedClients>>(
    new DataState<PaginatedClients>({ status: DataStatus.INIT })
  );

  const load = useCallback(async (target: number) => {
    setState(new DataState<PaginatedClients>({ status: DataStatus.LOADING }));
    const result = await handle(() => clientsDataSource.getClients(target));
    setState(result);
  }, []);

  useEffect(() => {
    load(page);
  }, [page, load]);

  const goToPage = (target: number) => {
    if (target >= 1) setPage(target);
  };

  return {
    state,
    page,
    goToPage,
    refetch: () => load(page),
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    isError: state.isError,
  };
}