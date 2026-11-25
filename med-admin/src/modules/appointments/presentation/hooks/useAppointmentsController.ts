import { useCallback, useEffect, useState } from 'react';
import { DataState, DataStatus } from '../../../../core/utils/dataState';
import { handle } from '../../../../core/utils/handler';
import { useLoadData } from '../../../../core/hooks/useLoadData';
import type { RoomModel } from '../../../../core/models/RoomModel';
import type { SectionModel } from '../../../../core/models/SectionModel';
import { appointmentsStatisticsDataSource, type AppointmentFilterOption } from '../../data/data_source/AppointmentsStatisticsDataSource';
import type { AppointmentQueryParams } from '../../data/queries/AppointmentQueryParams';
import type { PaginatedAppointments } from '../../data/models/AppointmentModel';

export function useAppointmentsController(initialFilters: AppointmentQueryParams = {}) {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<AppointmentQueryParams>(initialFilters);
  const [state, setState] = useState<DataState<PaginatedAppointments>>(
    new DataState<PaginatedAppointments>({ status: DataStatus.INIT })
  );

  const load = useCallback(async (target: number) => {
    setState(new DataState<PaginatedAppointments>({ status: DataStatus.LOADING }));
    const result = await handle(() =>
      appointmentsStatisticsDataSource.getAppointments(target, filters)
    );
    setState(result);
  }, [filters]);

  useEffect(() => {
    load(page);
  }, [page, load]);

  const rooms = useLoadData<RoomModel[]>(() => appointmentsStatisticsDataSource.getRooms());
  const sections = useLoadData<SectionModel[]>(() => appointmentsStatisticsDataSource.getSections());
  const clients = useLoadData<AppointmentFilterOption[]>(() => appointmentsStatisticsDataSource.getClientOptions());
  const employees = useLoadData<AppointmentFilterOption[]>(() => appointmentsStatisticsDataSource.getEmployeeOptions());

  const goToPage = (target: number) => {
    if (target >= 1) setPage(target);
  };

  const applyFilters = (next: AppointmentQueryParams) => {
    setFilters(next);
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({});
    setPage(1);
  };

  return {
    state,
    page,
    filters,
    rooms,
    sections,
    clients,
    employees,
    goToPage,
    applyFilters,
    resetFilters,
    refetch: () => load(page),
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    isError: state.isError,
  };
}