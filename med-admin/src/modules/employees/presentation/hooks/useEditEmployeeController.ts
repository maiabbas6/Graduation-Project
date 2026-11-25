import { useLoadData } from '../../../../core/hooks/useLoadData';
import { useSendData } from '../../../../core/hooks/useSendData';
import type { SectionModel } from '../../../../core/models/SectionModel';
import { employeesDataSource } from '../../data/data_source/EmployeesDataSource';
import type { EmployeeDetailModel, UpdateEmployeePayload } from '../../data/models/EmployeeModel';

export function useEditEmployeeController(id: number) {
  const employee = useLoadData<EmployeeDetailModel>(() => employeesDataSource.getEmployee(id));
  const sections = useLoadData<SectionModel[]>(() => employeesDataSource.getSections());

  const { state, sendData, isSubmitting } = useSendData<EmployeeDetailModel, UpdateEmployeePayload>(
    (payload) => employeesDataSource.updateEmployee(id, payload),
    { withLoader: true }
  );

  return {
    employee,
    sections,
    state,
    isSubmitting,
    updateEmployee: sendData,
    isSuccess: state.isSuccess,
    isError: state.isError,
  };
}