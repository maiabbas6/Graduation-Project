import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { useEditEmployeeController } from '../hooks/useEditEmployeeController';
import './EditEmployeePage.css';

const ROLE_OPTIONS = ['admin', 'doctor', 'nurse'];

interface EditEmployeeForm {
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

const initialForm: EditEmployeeForm = {
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

const toDateInput = (value: string): string => {
  const date = new Date(value);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export function EditEmployeePage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id);
  const navigate = useNavigate();
  const { employee, sections, state, isSubmitting, updateEmployee } = useEditEmployeeController(employeeId);

  const [form, setForm] = useState<EditEmployeeForm>(initialForm);

  const sectionOptions = sections.isSuccess ? (sections.state.data ?? []) : [];

  useEffect(() => {
    if (employee.isSuccess && employee.state.data) {
      const data = employee.state.data;
      setForm({
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        phone: data.user.phone,
        password: '',
        birth: toDateInput(data.user.birth),
        gender: data.user.gender === 'female' ? 'female' : 'male',
        address: data.user.address,
        role: data.user.roles[0] ?? 'doctor',
        section_id: data.section_id ? String(data.section_id) : '',
        specialization: data.specialization,
        license_no: data.license_no,
        hour_rate: String(data.hour_rate),
        qualifications: data.qualifications,
        contract_end_date: toDateInput(data.contract_end_date),
        is_active: data.is_active,
      });
    }
  }, [employee.isSuccess, employee.state.data]);

  useEffect(() => {
    if (state.isSuccess) {
      navigate(`/employees/${employeeId}`);
    }
  }, [state.isSuccess, navigate, employeeId]);

  const updateField = <K extends keyof EditEmployeeForm>(key: K, value: EditEmployeeForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateEmployee({
      first_name: form.first_name,
      last_name: form.last_name,
      phone: form.phone,
      password: form.password === '' ? undefined : form.password,
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
    });
  };

  const goToEmployees = () => navigate('/employees');

  return (
    <div className="dashboard-page">
      <PageHeader title={t('employees.editEmployee')} subtitle={t('employees.updateStaffDetails')} />

      <StatusComponent
        state={employee.state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
          </div>
        )}
        onSuccess={() => (
          <form className="dashboard-card edit-employee-card" onSubmit={handleSubmit}>
            <fieldset className="edit-fieldset">
              <legend className="edit-legend">{t('employees.accountDetails')}</legend>

              <div className="edit-grid">
                <label className="edit-field">
                  <span>{t('employees.firstName')}</span>
                  <input type="text" value={form.first_name} minLength={2} maxLength={255} required
                    onChange={(event) => updateField('first_name', event.target.value)} />
                </label>
                <label className="edit-field">
                  <span>{t('employees.lastName')}</span>
                  <input type="text" value={form.last_name} minLength={2} maxLength={255} required
                    onChange={(event) => updateField('last_name', event.target.value)} />
                </label>
                <label className="edit-field">
                  <span>{t('employees.phone')}</span>
                  <input type="tel" value={form.phone} minLength={10} maxLength={20} required pattern="[0-9+ ]{10,20}"
                    onChange={(event) => updateField('phone', event.target.value)} />
                </label>
                <label className="edit-field">
                  <span>{t('employees.password')}</span>
                  <input type="text" value={form.password} minLength={6} maxLength={255} placeholder={t('employees.leaveBlank')}
                    onChange={(event) => updateField('password', event.target.value)} />
                </label>
                <label className="edit-field">
                  <span>{t('employees.birthDate')}</span>
                  <input type="date" value={form.birth} required
                    onChange={(event) => updateField('birth', event.target.value)} />
                </label>
                <label className="edit-field">
                  <span>{t('common.gender')}</span>
                  <select value={form.gender} onChange={(event) => updateField('gender', event.target.value as 'male' | 'female')}>
                    <option value="male">{t('common.male')}</option>
                    <option value="female">{t('common.female')}</option>
                  </select>
                </label>
                <label className="edit-field">
                  <span>{t('common.address')}</span>
                  <input type="text" value={form.address} minLength={2} maxLength={255} required
                    onChange={(event) => updateField('address', event.target.value)} />
                </label>
                <label className="edit-field">
                  <span>{t('common.role')}</span>
                  <select value={form.role} onChange={(event) => updateField('role', event.target.value)}>
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </label>
              </div>
            </fieldset>

            <fieldset className="edit-fieldset">
              <legend className="edit-legend">{t('employees.professionalDetails')}</legend>

              <div className="edit-grid">
                <label className="edit-field">
                  <span>{t('employees.section')}</span>
                  <select value={form.section_id} required
                    onChange={(event) => updateField('section_id', event.target.value)}>
                    <option value="" disabled>{t('employees.selectSection')}</option>
                    {sectionOptions.map((section) => (
                      <option key={section.id} value={section.id}>{section.name}</option>
                    ))}
                  </select>
                </label>
                <label className="edit-field">
                  <span>{t('employees.specialization')}</span>
                  <input type="text" value={form.specialization} maxLength={255} required
                    onChange={(event) => updateField('specialization', event.target.value)} />
                </label>
                <label className="edit-field">
                  <span>{t('employees.licenseNo')}</span>
                  <input type="text" value={form.license_no} maxLength={100} required
                    onChange={(event) => updateField('license_no', event.target.value)} />
                </label>
                <label className="edit-field">
                  <span>{t('employees.hourRate')}</span>
                  <input type="number" value={form.hour_rate} min={0} step="0.01" required
                    onChange={(event) => updateField('hour_rate', event.target.value)} />
                </label>
                <label className="edit-field">
                  <span>{t('employees.qualifications')}</span>
                  <textarea value={form.qualifications} rows={3} required
                    onChange={(event) => updateField('qualifications', event.target.value)} />
                </label>
                <label className="edit-field">
                  <span>{t('employees.contractEndDate')}</span>
                  <input type="date" value={form.contract_end_date} required
                    onChange={(event) => updateField('contract_end_date', event.target.value)} />
                </label>
                <label className="edit-field edit-field-checkbox">
                  <input type="checkbox" checked={form.is_active}
                    onChange={(event) => updateField('is_active', event.target.checked)} />
                  <span>{t('common.active')}</span>
                </label>
              </div>
            </fieldset>

            {state.isError && <p className="edit-error">{String(state.error)}</p>}

            <div className="edit-actions">
              <button type="button" className="btn-outline" onClick={goToEmployees}>{t('common.cancel')}</button>
              <button type="submit" className="btn-primary-pill" disabled={isSubmitting || !sections.isSuccess}>
                {isSubmitting ? t('common.saving') : t('common.saveChanges')}
              </button>
            </div>
          </form>
        )}
      />
    </div>
  );
}
