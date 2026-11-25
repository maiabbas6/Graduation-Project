import { useCallback, useEffect, useState } from 'react';
import { DataState, DataStatus } from '../../../../core/utils/dataState';
import { handle } from '../../../../core/utils/handler';
import { employeesDataSource } from '../../data/data_source/EmployeesDataSource';
import type { PaginatedAttendances } from '../../data/models/AttendanceModel';

export function useEmployeeAttendancesController(employeeId: number, isOpen: boolean) {
  const [page, setPage] = useState(1);
  const [state, setState] = useState<DataState<PaginatedAttendances>>(
    new DataState<PaginatedAttendances>({ status: DataStatus.INIT })
  );

  const load = useCallback(async (target: number) => {
    setState(new DataState<PaginatedAttendances>({ status: DataStatus.LOADING }));
    const result = await handle(() => employeesDataSource.getEmployeeAttendances(employeeId, target));
    setState(result);
  }, [employeeId]);

  useEffect(() => {
    if (isOpen) setPage(1);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    load(page);
  }, [isOpen, page, load]);

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