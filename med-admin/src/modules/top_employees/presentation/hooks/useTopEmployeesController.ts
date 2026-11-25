import { useLoadData } from '../../../../core/hooks/useLoadData';
import { topEmployeesDataSource } from '../../data/data_source/TopEmployeesDataSource';
import type { TopEmployeeModel } from '../../data/models/TopEmployeeModel';

export function useTopEmployeesController() {
    const { state, refetch, isLoading, isSuccess, isError } = useLoadData<TopEmployeeModel[]>(
        () => topEmployeesDataSource.getTopEmployees()
    );

    return { state, refetch, isLoading, isSuccess, isError };
}
