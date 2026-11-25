import { useSendData } from '../../../../core/hooks/useSendData';
import { employeesDataSource } from '../../data/data_source/EmployeesDataSource';
import type { CreateAttendancePayload } from '../../data/models/AttendanceModel';

export function useCreateAttendanceController() {
  const { state, sendData, isSubmitting } = useSendData<void, CreateAttendancePayload>(
    (payload) => employeesDataSource.createAttendance(payload),
    { withLoader: true }
  );

  return {
    state,
    isSubmitting,
    createAttendance: sendData,
    isSuccess: state.isSuccess,
    isError: state.isError,
    error: state.error,
  };
}