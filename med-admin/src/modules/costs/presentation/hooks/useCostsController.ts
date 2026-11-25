import { useLoadData } from '../../../../core/hooks/useLoadData';
import { costsDataSource } from '../../data/data_source/CostsDataSource';
import type { CostModel } from '../../../../core/models/CostModel';

export function useCostsController() {
    const { state, refetch } = useLoadData<CostModel[]>(() => costsDataSource.getCosts());

    return { state, refetch };
}
