import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { StatusComponent } from '../../../../core/components/StatusComponent';
import { PageHeader } from '../../../../core/components/PageHeader';
import { Pagination } from '../../../../core/components/Pagination';
import { Modal } from '../../../../core/components/Modal';
import { useAppointmentsController } from '../hooks/useAppointmentsController';
import { AppointmentsList } from '../components/AppointmentsList';

export function AppointmentsPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const employeeParam = searchParams.get('employee_id');
  const employeeId = employeeParam !== null && employeeParam !== '' ? Number(employeeParam) : NaN;
  const initialFilters = !Number.isNaN(employeeId) ? { employee_id: employeeId } : {};

  const { state, filters, rooms, sections, clients, employees, goToPage, applyFilters, resetFilters, refetch } = useAppointmentsController(initialFilters);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  const selectedClient = clients.isSuccess ? clients.state.data?.find(c => c.id === filters.user_id) : null;
  const selectedEmployee = employees.isSuccess ? employees.state.data?.find(e => e.id === filters.employee_id) : null;
  const selectedSection = sections.isSuccess ? sections.state.data?.find(s => s.id === filters.section_id) : null;
  const selectedRoom = rooms.isSuccess ? rooms.state.data?.find(r => r.id === filters.room_id) : null;

  return (
    <div className="dashboard-page">
      <PageHeader title={t('appointments.title')} subtitle={t('appointments.subtitle')} />

      <div className="dashboard-card filter-summary-bar">
        <div className="filter-summary">
          <div className="filter-item">
            <span>{t('appointments.clientLabel')} {selectedClient?.name || t('common.all')}</span>
            <button className="btn-outline" onClick={() => setIsClientModalOpen(true)}>{t('appointments.change')}</button>
          </div>
          <div className="filter-item">
            <span>{t('appointments.employeeLabel')} {selectedEmployee?.name || t('common.all')}</span>
            <button className="btn-outline" onClick={() => setIsEmployeeModalOpen(true)}>{t('appointments.change')}</button>
          </div>
          <div className="filter-item">
            <span>{t('appointments.sectionLabel')} {selectedSection?.name || t('common.all')}</span>
            <button className="btn-outline" onClick={() => setIsSectionModalOpen(true)}>{t('appointments.change')}</button>
          </div>
          <div className="filter-item">
            <span>{t('appointments.roomLabel')} {selectedRoom?.name || t('common.all')}</span>
            <button className="btn-outline" onClick={() => setIsRoomModalOpen(true)}>{t('appointments.change')}</button>
          </div>
        </div>
        <button className="filter-button-reset" onClick={resetFilters}>{t('common.reset')}</button>
      </div>

      <StatusComponent
        state={state}
        onError={(message) => (
          <div className="dashboard-card dashboard-error">
            <p>{message}</p>
            <button className="btn-primary-pill" onClick={() => refetch()}>{t('common.retry')}</button>
          </div>
        )}
        onSuccess={(result) => (
          <>
            <div className="dashboard-card">
              <AppointmentsList appointments={result.data} />
            </div>
            <Pagination
              currentPage={result.current_page}
              lastPage={result.last_page}
              onChange={goToPage}
            />
          </>
        )}
      />

      <Modal isOpen={isClientModalOpen} onClose={() => setIsClientModalOpen(false)} title={t('appointments.selectClient')}>
        <ul className="selection-list">
          <li onClick={() => { applyFilters({ ...filters, user_id: undefined }); setIsClientModalOpen(false); }}>{t('appointments.allClients')}</li>
          {clients.isSuccess && clients.state.data?.map(c => (
            <li key={c.id} onClick={() => { applyFilters({ ...filters, user_id: c.id }); setIsClientModalOpen(false); }}>{c.name}</li>
          ))}
        </ul>
      </Modal>

      <Modal isOpen={isEmployeeModalOpen} onClose={() => setIsEmployeeModalOpen(false)} title={t('appointments.selectEmployee')}>
        <ul className="selection-list">
          <li onClick={() => { applyFilters({ ...filters, employee_id: undefined }); setIsEmployeeModalOpen(false); }}>{t('appointments.allEmployees')}</li>
          {employees.isSuccess && employees.state.data?.map(e => (
            <li key={e.id} onClick={() => { applyFilters({ ...filters, employee_id: e.id }); setIsEmployeeModalOpen(false); }}>{e.name}</li>
          ))}
        </ul>
      </Modal>

      <Modal isOpen={isSectionModalOpen} onClose={() => setIsSectionModalOpen(false)} title={t('appointments.selectSection')}>
        <ul className="selection-list">
          <li onClick={() => { applyFilters({ ...filters, section_id: undefined }); setIsSectionModalOpen(false); }}>{t('appointments.allSections')}</li>
          {sections.isSuccess && sections.state.data?.map(s => (
            <li key={s.id} onClick={() => { applyFilters({ ...filters, section_id: s.id }); setIsSectionModalOpen(false); }}>{s.name}</li>
          ))}
        </ul>
      </Modal>

      <Modal isOpen={isRoomModalOpen} onClose={() => setIsRoomModalOpen(false)} title={t('appointments.selectRoom')}>
        <ul className="selection-list">
          <li onClick={() => { applyFilters({ ...filters, room_id: undefined }); setIsRoomModalOpen(false); }}>{t('appointments.allRooms')}</li>
          {rooms.isSuccess && rooms.state.data?.map(r => (
            <li key={r.id} onClick={() => { applyFilters({ ...filters, room_id: r.id }); setIsRoomModalOpen(false); }}>{r.name}</li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
