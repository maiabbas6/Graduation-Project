import { useLoadData } from '../../../../core/hooks/useLoadData';
import { useSendData } from '../../../../core/hooks/useSendData';
import { costsDataSource } from '../../data/data_source/CostsDataSource';
import type { CostModel } from '../../../../core/models/CostModel';

export function useCostDetailController(id: number) {
    const { state, refetch } = useLoadData<CostModel>(() => costsDataSource.getCost(id));

    const markAsPaid = useSendData<CostModel, { id: number }>(
        ({ id }) => costsDataSource.markAsPaid(id),
        { withLoader: true, onSuccess: () => refetch() }
    );

    const markAsUnpaid = useSendData<CostModel, { id: number }>(
        ({ id }) => costsDataSource.markAsUnpaid(id),
        { withLoader: true, onSuccess: () => refetch() }
    );

    return { state, refetch, markAsPaid, markAsUnpaid };
}
