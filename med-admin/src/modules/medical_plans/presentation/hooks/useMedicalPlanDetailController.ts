import { useLoadData } from '../../../../core/hooks/useLoadData';
import { medicalPlansDataSource } from '../../data/data_source/MedicalPlansDataSource';
import type { MedicalPlanModel } from '../../data/models/MedicalPlanModel';

export function useMedicalPlanDetailController(id: number) {
    const { state, refetch, isLoading, isSuccess, isError } = useLoadData<MedicalPlanModel>(
        () => medicalPlansDataSource.getMedicalPlan(id)
    );

    return { state, refetch, isLoading, isSuccess, isError };
}
