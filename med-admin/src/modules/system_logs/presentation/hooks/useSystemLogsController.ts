import { useCallback, useEffect, useState } from 'react';
import { DataState, DataStatus } from '../../../../core/utils/dataState';
import { handle } from '../../../../core/utils/handler';
import { systemLogsDataSource } from '../../data/data_source/SystemLogsDataSource';
import type { PaginatedSystemLogs } from '../../data/models/SystemLogModel';
import type { SystemLogQueryParams } from '../../data/queries/SystemLogQueryParams';

export function useSystemLogsController() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<SystemLogQueryParams>({});
  const [state, setState] = useState<DataState<PaginatedSystemLogs>>(
    new DataState<PaginatedSystemLogs>({ status: DataStatus.INIT })
  );

  const load = useCallback(async (target: number) => {
    setState(new DataState<PaginatedSystemLogs>({ status: DataStatus.LOADING }));
    const result = await handle(() => systemLogsDataSource.getSystemLogs(target, filters));
    setState(result);
  }, [filters]);

  useEffect(() => {
    load(page);
  }, [page, load]);

  const goToPage = (target: number) => {
    if (target >= 1) setPage(target);
  };

  const applyFilters = (next: SystemLogQueryParams) => {
    setFilters(next);
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({});
    setPage(1);
  };

  return {
    state,
    page,
    filters,
    goToPage,
    applyFilters,
    resetFilters,
    refetch: () => load(page),
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    isError: state.isError,
  };
}