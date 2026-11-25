import { useLoadData } from '../../../../core/hooks/useLoadData';
import { medicalRecordsDataSource } from '../../data/data_source/MedicalRecordsDataSource';
import type { MedicalRecordModel } from '../../data/models/MedicalRecordModel';

export function useMedicalRecordDetailController(id: number) {
    const { state, refetch, isLoading, isSuccess, isError } = useLoadData<MedicalRecordModel>(
        () => medicalRecordsDataSource.getMedicalRecord(id)
    );

    return { state, refetch, isLoading, isSuccess, isError };
}
