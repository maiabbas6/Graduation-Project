import { useLoadData } from '../../../../core/hooks/useLoadData';
import { appointmentsStatisticsDataSource } from '../../data/data_source/AppointmentsStatisticsDataSource';

export function useAppointmentDetailController(id: number) {
  const { state, refetch, isLoading, isSuccess, isError } = useLoadData(() =>
    appointmentsStatisticsDataSource.getAppointment(id)
  );

  return { state, refetch, isLoading, isSuccess, isError };
}