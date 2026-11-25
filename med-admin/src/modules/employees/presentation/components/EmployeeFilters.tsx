import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../../core/components/Modal';
import type { SectionModel } from '../../../../core/models/SectionModel';
import type { EmployeeQueryParams } from '../../data/queries/EmployeeQueryParams';

interface EmployeeFiltersProps {
  filters: EmployeeQueryParams;
  sections: SectionModel[];
  onApply: (filters: EmployeeQueryParams) => void;
  onReset: () => void;
}

export function EmployeeFilters({ filters, sections, onApply, onReset }: EmployeeFiltersProps) {
  const { t } = useTranslation();
  const [name, setName] = useState(filters.name ?? '');
  const [sectionId, setSectionId] = useState<number | undefined>(filters.section_id);
  const [specialization, setSpecialization] = useState(filters.specialization ?? '');
  const [status, setStatus] = useState(filters.is_active === undefined ? '' : String(filters.is_active));
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);

  const selectedSection = sections.find(s => s.id === sectionId);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply({
      name: name.trim() || undefined,
      section_id: sectionId,
      specialization: specialization.trim() || undefined,
      is_active: status === '' ? undefined : status === 'true',
    });
  };

  const handleReset = () => {
    setName('');
    setSectionId(undefined);
    setSpecialization('');
    setStatus('');
    onReset();
  };

  const selectSection = (id: number | undefined) => {
    setSectionId(id);
    setIsSectionModalOpen(false);
  };

  return (
    <>
      <form className="filter-bar" onSubmit={handleSubmit}>
        <label className="filter-field">
          <span>{t('common.name')}</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t('employees.searchByName')}
          />
        </label>

        <div className="filter-field">
          <span>{t('employees.section')}</span>
          <button type="button" className="filter-select-button" onClick={() => setIsSectionModalOpen(true)}>
            {selectedSection?.name ?? t('appointments.allSections')}
          </button>
        </div>

        <label className="filter-field">
          <span>{t('employees.specialization')}</span>
          <input
            type="text"
            value={specialization}
            onChange={(event) => setSpecialization(event.target.value)}
            placeholder={t('employees.specializationPlaceholder')}
          />
        </label>

        <label className="filter-field">
          <span>{t('employees.type')}</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="">{t('common.all')}</option>
            <option value="true">{t('common.active')}</option>
            <option value="false">{t('common.inactive')}</option>
          </select>
        </label>

        <button type="submit" className="filter-button">{t('common.filter')}</button>
        <button type="button" className="filter-button filter-button-reset" onClick={handleReset}>
          {t('common.reset')}
        </button>
      </form>

      <Modal isOpen={isSectionModalOpen} onClose={() => setIsSectionModalOpen(false)} title={t('appointments.selectSection')}>
        <ul className="selection-list">
          <li onClick={() => selectSection(undefined)}>{t('appointments.allSections')}</li>
          {sections.map((section) => (
            <li key={section.id} onClick={() => selectSection(section.id)}>{section.name}</li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
