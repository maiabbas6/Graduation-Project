import { useCallback, useEffect, useState } from 'react';
import { DataState, DataStatus } from '../../../../core/utils/dataState';
import { handle } from '../../../../core/utils/handler';
import { useLoadData } from '../../../../core/hooks/useLoadData';
import { medicalPlansDataSource } from '../../data/data_source/MedicalPlansDataSource';
import type { PaginatedMedicalPlans } from '../../data/models/MedicalPlanModel';
import type { FilterOption } from '../../medical_records/data/data_source/MedicalRecordsDataSource';

export function useMedicalPlansController() {
    const [page, setPage] = useState(1);
    const [userId, setUserId] = useState<number | undefined>(undefined);
    const [state, setState] = useState<DataState<PaginatedMedicalPlans>>(
        new DataState<PaginatedMedicalPlans>({ status: DataStatus.INIT })
    );

    const load = useCallback(async (target: number, uid?: number) => {
        setState(new DataState<PaginatedMedicalPlans>({ status: DataStatus.LOADING }));
        const result = await handle(() => medicalPlansDataSource.getMedicalPlans(target, uid));
        setState(result);
    }, []);

    useEffect(() => {
        load(page, userId);
    }, [page, load, userId]);

    const goToPage = (target: number) => {
        if (target >= 1) setPage(target);
    };

    const clients = useLoadData<FilterOption[]>(() => medicalPlansDataSource.getClientOptions());

    return {
        state,
        page,
        userId,
        clients,
        setUserId,
        goToPage,
        refetch: () => load(page, userId),
        isLoading: state.isLoading,
        isSuccess: state.isSuccess,
        isError: state.isError,
    };
}
