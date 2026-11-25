import { useLoadData } from '../../../../core/hooks/useLoadData';
import { systemLogsDataSource } from '../../data/data_source/SystemLogsDataSource';
import type { SystemLogDetailModel } from '../../data/models/SystemLogModel';

export function useSystemLogDetailController(id: number) {
  const { state, refetch, isLoading, isSuccess, isError } = useLoadData<SystemLogDetailModel>(() =>
    systemLogsDataSource.getSystemLogDetail(id)
  );

  return { state, refetch, isLoading, isSuccess, isError };
}