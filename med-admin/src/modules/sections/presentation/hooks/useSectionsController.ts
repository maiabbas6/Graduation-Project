import { useLoadData } from '../../../../core/hooks/useLoadData';
import { sectionsDataSource } from '../../data/data_source/SectionsDataSource';

export function useSectionsController() {
  const { state, refetch, isLoading, isSuccess, isError } = useLoadData(() =>
    sectionsDataSource.getSections()
  );

  return { state, refetch, isLoading, isSuccess, isError };
}