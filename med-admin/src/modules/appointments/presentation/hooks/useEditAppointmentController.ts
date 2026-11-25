import { useLoadData } from '../../../../core/hooks/useLoadData';
import { useSendData } from '../../../../core/hooks/useSendData';
import type { RoomModel } from '../../../../core/models/RoomModel';
import { appointmentsStatisticsDataSource, type AppointmentFilterOption } from '../../data/data_source/AppointmentsStatisticsDataSource';
import type { AppointmentDetailModel, UpdateAppointmentPayload } from '../../data/models/AppointmentModel';

export function useEditAppointmentController(id: number) {
  const appointment = useLoadData<AppointmentDetailModel>(() =>
    appointmentsStatisticsDataSource.getAppointment(id)
  );
  const rooms = useLoadData<RoomModel[]>(() => appointmentsStatisticsDataSource.getRooms());
  const employees = useLoadData<AppointmentFilterOption[]>(() => appointmentsStatisticsDataSource.getEmployeeOptions());

  const { state, sendData, isSubmitting } = useSendData<AppointmentDetailModel, UpdateAppointmentPayload>(
    (payload) => appointmentsStatisticsDataSource.updateAppointment(id, payload),
    { withLoader: true }
  );

  return {
    appointment,
    rooms,
    employees,
    state,
    isSubmitting,
    updateAppointment: sendData,
    isSuccess: state.isSuccess,
    isError: state.isError,
  };
}