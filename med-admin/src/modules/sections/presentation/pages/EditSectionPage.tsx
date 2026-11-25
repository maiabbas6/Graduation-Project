import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import type { UpdateSectionPayload } from '../../../../core/models/SectionModel';
import { useEditSectionController } from '../hooks/useEditSectionController';
import './EditSectionPage.css';

export function EditSectionPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const sectionId = Number(id);
  const navigate = useNavigate();
  const { sections, section, state, isSubmitting, updateSection } = useEditSectionController(sectionId);

  const [form, setForm] = useState<UpdateSectionPayload>({ name: '', icon: '' });

  useEffect(() => {
    if (section) {
      setForm({ name: section.name, icon: section.icon });
    }
  }, [section]);

  useEffect(() => {
    if (state.isSuccess) {
      navigate('/sections');
    }
  }, [state.isSuccess, navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSection({ name: form.name, icon: form.icon === '' ? undefined : form.icon });
  };

  return (
    <div className="dashboard-page">
      <PageHeader title={t('sections.editSection')} subtitle={t('sections.updateDetails')} />

      <StatusComponent
        state={sections.state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
          </div>
        )}
        onSuccess={() =>
          section ? (
            <form className="dashboard-card edit-section-card" onSubmit={handleSubmit}>
              <div className="edit-grid">
                <label className="edit-field">
                  <span>{t('sections.name')}</span>
                  <input
                    type="text"
                    value={form.name}
                    minLength={2}
                    maxLength={255}
                    required
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  />
                </label>
                <label className="edit-field">
                  <span>{t('sections.icon')}</span>
                  <input
                    type="text"
                    value={form.icon ?? ''}
                    placeholder={t('sections.iconPlaceholder')}
                    onChange={(event) => setForm((prev) => ({ ...prev, icon: event.target.value }))}
                  />
                </label>
              </div>

              {state.isError && <p className="edit-error">{String(state.error)}</p>}

              <div className="edit-actions">
                <button type="button" className="btn-outline" onClick={() => navigate('/sections')}>{t('common.cancel')}</button>
                <button type="submit" className="btn-primary-pill" disabled={isSubmitting}>
                  {isSubmitting ? t('common.saving') : t('common.saveChanges')}
                </button>
              </div>
            </form>
          ) : (
            <div className="dashboard-card dashboard-error">
              <p>{t('sections.sectionNotFound')}</p>
            </div>
          )
        }
      />
    </div>
  );
}
