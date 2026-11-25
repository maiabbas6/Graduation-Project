import { useCallback, useEffect, useState } from 'react';
import { DataState, DataStatus } from '../../../../core/utils/dataState';
import { handle } from '../../../../core/utils/handler';
import { useLoadData } from '../../../../core/hooks/useLoadData';
import type { SectionModel } from '../../../../core/models/SectionModel';
import { employeesDataSource } from '../../data/data_source/EmployeesDataSource';
import type { EmployeeQueryParams } from '../../data/queries/EmployeeQueryParams';
import type { PaginatedEmployees } from '../../data/models/EmployeeModel';

export function useEmployeesController(initialFilters: EmployeeQueryParams = {}) {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<EmployeeQueryParams>(initialFilters);
  const [state, setState] = useState<DataState<PaginatedEmployees>>(
    new DataState<PaginatedEmployees>({ status: DataStatus.INIT })
  );

  const load = useCallback(async (target: number) => {
    setState(new DataState<PaginatedEmployees>({ status: DataStatus.LOADING }));
    const result = await handle(() => employeesDataSource.getEmployees(target, filters));
    setState(result);
  }, [filters]);

  useEffect(() => {
    load(page);
  }, [page, load]);

  const sections = useLoadData<SectionModel[]>(() => employeesDataSource.getSections());

  const goToPage = (target: number) => {
    if (target >= 1) setPage(target);
  };

  const applyFilters = (next: EmployeeQueryParams) => {
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
    sections,
    goToPage,
    applyFilters,
    resetFilters,
    refetch: () => load(page),
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    isError: state.isError,
  };
}