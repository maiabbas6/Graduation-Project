import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCreateEmployeeController } from '../hooks/useCreateEmployeeController';
import { PageHeader } from '../../../../core/components/PageHeader';
import './CreateEmployeePage.css';

const ROLE_OPTIONS = ['admin', 'doctor', 'nurse'];

interface CreateEmployeeForm {
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  birth: string;
  gender: 'male' | 'female';
  address: string;
  role: string;
  section_id: string;
  specialization: string;
  license_no: string;
  hour_rate: string;
  qualifications: string;
  contract_end_date: string;
  is_active: boolean;
}

const initialForm: CreateEmployeeForm = {
  first_name: '',
  last_name: '',
  phone: '',
  password: '',
  birth: '',
  gender: 'male',
  address: '',
  role: 'doctor',
  section_id: '',
  specialization: '',
  license_no: '',
  hour_rate: '',
  qualifications: '',
  contract_end_date: '',
  is_active: true,
};

export function CreateEmployeePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sections, state, isSubmitting, createEmployee } = useCreateEmployeeController();

  const [form, setForm] = useState<CreateEmployeeForm>(initialForm);
  const [attatchments, setAttatchments] = useState<File[]>([]);

  const sectionOptions = sections.isSuccess ? (sections.state.data ?? []) : [];

  useEffect(() => {
    if (state.isSuccess && state.data?.id) {
      navigate(`/employees/${state.data.id}`);
    }
  }, [state.isSuccess, state.data, navigate]);

  const updateField = <K extends keyof CreateEmployeeForm>(key: K, value: CreateEmployeeForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFiles = (files: FileList | null) => {
    if (files) {
      setAttatchments(Array.from(files));
    } else {
      setAttatchments([]);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createEmployee({
      first_name: form.first_name,
      last_name: form.last_name,
      phone: form.phone,
      password: form.password,
      birth: form.birth,
      gender: form.gender,
      address: form.address,
      role: form.role,
      section_id: Number(form.section_id),
      specialization: form.specialization,
      license_no: form.license_no,
      hour_rate: Number(form.hour_rate),
      qualifications: form.qualifications,
      contract_end_date: form.contract_end_date,
      is_active: form.is_active,
      attatchments,
    });
  };

  const goToEmployees = () => navigate('/employees');

  return (
    <div className="dashboard-page">
      <PageHeader title={t('employees.newEmployee')} subtitle={t('employees.createStaff')} />

      <form className="dashboard-card create-employee-card" onSubmit={handleSubmit}>
        <fieldset className="create-fieldset">
          <legend className="create-legend">{t('employees.accountDetails')}</legend>

          <div className="create-grid">
            <label className="create-field">
              <span>{t('employees.firstName')}</span>
              <input type="text" value={form.first_name} minLength={2} maxLength={255} required
                onChange={(event) => updateField('first_name', event.target.value)} />
            </label>
            <label className="create-field">
              <span>{t('employees.lastName')}</span>
              <input type="text" value={form.last_name} minLength={2} maxLength={255} required
                onChange={(event) => updateField('last_name', event.target.value)} />
            </label>
            <label className="create-field">
              <span>{t('employees.phone')}</span>
              <input type="tel" value={form.phone} minLength={10} maxLength={20} required pattern="[0-9+ ]{10,20}"
                onChange={(event) => updateField('phone', event.target.value)} />
            </label>
            <label className="create-field">
              <span>{t('employees.password')}</span>
              <input type="text" value={form.password} minLength={6} maxLength={255} required
                onChange={(event) => updateField('password', event.target.value)} />
            </label>
            <label className="create-field">
              <span>{t('employees.birthDate')}</span>
              <input type="date" value={form.birth} required
                onChange={(event) => updateField('birth', event.target.value)} />
            </label>
            <label className="create-field">
              <span>{t('common.gender')}</span>
              <select value={form.gender} onChange={(event) => updateField('gender', event.target.value as 'male' | 'female')}>
                <option value="male">{t('common.male')}</option>
                <option value="female">{t('common.female')}</option>
              </select>
            </label>
            <label className="create-field">
              <span>{t('common.address')}</span>
              <input type="text" value={form.address} minLength={2} maxLength={255} required
                onChange={(event) => updateField('address', event.target.value)} />
            </label>
            <label className="create-field">
              <span>{t('common.role')}</span>
              <select value={form.role} onChange={(event) => updateField('role', event.target.value)}>
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </label>
          </div>
        </fieldset>

        <fieldset className="create-fieldset">
          <legend className="create-legend">{t('employees.professionalDetails')}</legend>

          <div className="create-grid">
            <label className="create-field">
              <span>{t('employees.section')}</span>
              <select value={form.section_id} required
                onChange={(event) => updateField('section_id', event.target.value)}>
                <option value="" disabled>{t('employees.selectSection')}</option>
                {sectionOptions.map((section) => (
                  <option key={section.id} value={section.id}>{section.name}</option>
                ))}
              </select>
            </label>
            <label className="create-field">
              <span>{t('employees.specialization')}</span>
              <input type="text" value={form.specialization} maxLength={255} required
                onChange={(event) => updateField('specialization', event.target.value)} />
            </label>
            <label className="create-field">
              <span>{t('employees.licenseNo')}</span>
              <input type="text" value={form.license_no} maxLength={100} required
                onChange={(event) => updateField('license_no', event.target.value)} />
            </label>
            <label className="create-field">
              <span>{t('employees.hourRate')}</span>
              <input type="number" value={form.hour_rate} min={0} step="0.01" required
                onChange={(event) => updateField('hour_rate', event.target.value)} />
            </label>
            <label className="create-field">
              <span>{t('employees.qualifications')}</span>
              <textarea value={form.qualifications} rows={3} required
                onChange={(event) => updateField('qualifications', event.target.value)} />
            </label>
            <label className="create-field">
              <span>{t('employees.contractEndDate')}</span>
              <input type="date" value={form.contract_end_date} required
                onChange={(event) => updateField('contract_end_date', event.target.value)} />
            </label>
            <label className="create-field create-field-checkbox">
              <input type="checkbox" checked={form.is_active}
                onChange={(event) => updateField('is_active', event.target.checked)} />
              <span>{t('common.active')}</span>
            </label>
            <label className="create-field">
              <span>{t('employees.attachments')}</span>
              <input type="file" multiple accept="image/*,application/pdf"
                onChange={(event) => handleFiles(event.target.files)} />
            </label>
          </div>
        </fieldset>

        {attatchments.length > 0 && (
          <p className="create-files">{t('employees.selectedFiles')} {attatchments.map((file) => file.name).join(', ')}</p>
        )}
        {state.isError && <p className="create-error">{String(state.error)}</p>}

        <div className="create-actions">
          <button type="button" className="btn-outline" onClick={goToEmployees}>{t('common.cancel')}</button>
          <button type="submit" className="btn-primary-pill" disabled={isSubmitting || !sections.isSuccess}>
            {isSubmitting ? t('employees.creating') : t('employees.createEmployee')}
          </button>
        </div>
      </form>
    </div>
  );
}
