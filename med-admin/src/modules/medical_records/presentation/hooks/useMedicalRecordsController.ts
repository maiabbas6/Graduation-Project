import { useCallback, useEffect, useState } from 'react';
import { DataState, DataStatus } from '../../../../core/utils/dataState';
import { handle } from '../../../../core/utils/handler';
import { useLoadData } from '../../../../core/hooks/useLoadData';
import { medicalRecordsDataSource, type FilterOption } from '../../data/data_source/MedicalRecordsDataSource';
import type { MedicalRecordQueryParams } from '../../data/queries/MedicalRecordQueryParams';
import type { MedicalRecordModel } from '../../data/models/MedicalRecordModel';

export function useMedicalRecordsController(initialFilters: MedicalRecordQueryParams = {}) {
    const [filters, setFilters] = useState<MedicalRecordQueryParams>(initialFilters);
    const [state, setState] = useState<DataState<MedicalRecordModel[]>>(
        new DataState<MedicalRecordModel[]>({ status: DataStatus.INIT })
    );

    const load = useCallback(async () => {
        setState(new DataState<MedicalRecordModel[]>({ status: DataStatus.LOADING }));
        const result = await handle(() =>
            medicalRecordsDataSource.getMedicalRecords(filters)
        );
        setState(result);
    }, [filters]);

    useEffect(() => {
        load();
    }, [load]);

    const clients = useLoadData<FilterOption[]>(() => medicalRecordsDataSource.getClientOptions());
    const employees = useLoadData<FilterOption[]>(() => medicalRecordsDataSource.getEmployeeOptions());

    const applyFilters = (next: MedicalRecordQueryParams) => {
        setFilters(next);
    };

    const resetFilters = () => {
        setFilters({});
    };

    return {
        state,
        filters,
        clients,
        employees,
        applyFilters,
        resetFilters,
        refetch: load,
        isLoading: state.isLoading,
        isSuccess: state.isSuccess,
        isError: state.isError,
    };
}
