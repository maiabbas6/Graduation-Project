import { useLoadData } from '../../../../core/hooks/useLoadData';
import { statisticsDataSource } from '../../data/data_source/StatisticsDataSource';

export function useDashboardController() {
  const { state, refetch, isLoading, isSuccess, isError } = useLoadData(() =>
    statisticsDataSource.getStatistics()
  );

  return { state, refetch, isLoading, isSuccess, isError };
}