import { useSendData } from '../../../../core/hooks/useSendData';
import { employeesDataSource } from '../../data/data_source/EmployeesDataSource';
import type { CreateSchedulePayload } from '../../data/models/ScheduleModel';

export function useCreateScheduleController() {
  const { state, sendData, isSubmitting } = useSendData<void, CreateSchedulePayload>(
    (payload) => employeesDataSource.createSchedule(payload),
    { withLoader: true }
  );

  return {
    state,
    isSubmitting,
    createSchedule: sendData,
    isSuccess: state.isSuccess,
    isError: state.isError,
    error: state.error,
  };
}