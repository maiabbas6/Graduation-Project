import { useLoadData } from '../../../../core/hooks/useLoadData';
import { clientsDataSource } from '../../data/data_source/ClientsDataSource';
import type { ClientDetailModel } from '../../data/models/ClientModel';

export function useClientDetailController(id: number) {
  const { state, refetch, isLoading, isSuccess, isError } = useLoadData<ClientDetailModel>(() =>
    clientsDataSource.getClientDetail(id)
  );

  return { state, refetch, isLoading, isSuccess, isError };
}