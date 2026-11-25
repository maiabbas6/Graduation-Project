import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { SectionModel } from '../../../../core/models/SectionModel';
import './SectionsList.css';

interface SectionsListProps {
  sections: SectionModel[];
}

export function SectionsList({ sections }: SectionsListProps) {
  const { t } = useTranslation();

  if (!sections || sections.length === 0) {
    return <p className="list-empty">{t('sections.noSections')}</p>;
  }

  return (
    <ul className="section-list">
      {sections.map((section) => (
        <li key={section.id} className="section-row">
          <Link
            className="section-link"
            to={`/employees?section_id=${section.id}`}
          >
            <div className="section-icon">
              <img src={section.icon} alt="" />
            </div>
            <strong className="section-name">{section.name}</strong>
            <span className="section-count">
              {section.employees_count} {section.employees_count === 1 ? t('sections.employee') : t('sections.employees')}
            </span>
          </Link>
          <Link to={`/sections/${section.id}/edit`} className="section-edit">{t('common.edit')}</Link>
        </li>
      ))}
    </ul>
  );
}
