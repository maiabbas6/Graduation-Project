import { useLoadData } from '../../../../core/hooks/useLoadData';
import { useSendData } from '../../../../core/hooks/useSendData';
import type { SectionModel } from '../../../../core/models/SectionModel';
import { employeesDataSource } from '../../data/data_source/EmployeesDataSource';
import type { CreateEmployeePayload, EmployeeDetailModel } from '../../data/models/EmployeeModel';

export function useCreateEmployeeController() {
  const sections = useLoadData<SectionModel[]>(() => employeesDataSource.getSections());

  const { state, sendData, isSubmitting } = useSendData<EmployeeDetailModel, CreateEmployeePayload>(
    (payload) => employeesDataSource.createEmployee(payload),
    { withLoader: true }
  );

  return {
    sections,
    state,
    isSubmitting,
    createEmployee: sendData,
    isSuccess: state.isSuccess,
    isError: state.isError,
  };
}