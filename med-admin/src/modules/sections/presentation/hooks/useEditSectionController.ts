import { useLoadData } from '../../../../core/hooks/useLoadData';
import { useSendData } from '../../../../core/hooks/useSendData';
import type { SectionModel, UpdateSectionPayload } from '../../../../core/models/SectionModel';
import { sectionsDataSource } from '../../data/data_source/SectionsDataSource';

export function useEditSectionController(id: number) {
  const sections = useLoadData<SectionModel[]>(() => sectionsDataSource.getSections());

  const { state, sendData, isSubmitting } = useSendData<SectionModel, UpdateSectionPayload>(
    (payload) => sectionsDataSource.updateSection(id, payload),
    { withLoader: true }
  );

  const section = sections.isSuccess
    ? (sections.state.data?.find((item) => item.id === id) ?? null)
    : null;

  return {
    sections,
    section,
    state,
    isSubmitting,
    updateSection: sendData,
    isSuccess: state.isSuccess,
    isError: state.isError,
  };
}