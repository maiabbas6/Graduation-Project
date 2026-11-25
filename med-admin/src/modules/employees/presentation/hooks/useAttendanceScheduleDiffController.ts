import { useLoadData } from '../../../../core/hooks/useLoadData';
import { employeesDataSource } from '../../data/data_source/EmployeesDataSource';
import type { AttendanceScheduleDiffItem } from '../../data/models/AttendanceModel';

export function useAttendanceScheduleDiffController(id: number) {
  const { state, refetch, isLoading, isSuccess, isError } = useLoadData<AttendanceScheduleDiffItem[]>(() =>
    employeesDataSource.getAttendanceScheduleDiff(id)
  );

  return { state, refetch, isLoading, isSuccess, isError };
}