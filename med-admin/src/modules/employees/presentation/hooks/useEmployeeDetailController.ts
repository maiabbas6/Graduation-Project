import { useLoadData } from '../../../../core/hooks/useLoadData';
import { employeesDataSource } from '../../data/data_source/EmployeesDataSource';

export function useEmployeeDetailController(id: number) {
  const { state, refetch, isLoading, isSuccess, isError } = useLoadData(() =>
    employeesDataSource.getEmployee(id)
  );

  return { state, refetch, isLoading, isSuccess, isError };
}