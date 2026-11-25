import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { LoginPage } from '../../modules/auth/presentation/pages/LoginPage';
import { RequireAuth } from '../../modules/auth/presentation/components/RequireAuth';
import { DashboardPage } from '../../modules/dashboard/presentation/pages/DashboardPage';
import { SectionsPage } from '../../modules/sections/presentation/pages/SectionsPage';
import { EmployeesPage } from '../../modules/employees/presentation/pages/EmployeesPage';
import { EmployeeDetailPage } from '../../modules/employees/presentation/pages/EmployeeDetailPage';
import { AttendanceScheduleDiffPage } from '../../modules/employees/presentation/pages/AttendanceScheduleDiffPage';
import { EditSectionPage } from '../../modules/sections/presentation/pages/EditSectionPage';
import { CreateEmployeePage } from '../../modules/employees/presentation/pages/CreateEmployeePage';
import { EditEmployeePage } from '../../modules/employees/presentation/pages/EditEmployeePage';
import { ClientsPage } from '../../modules/clients/presentation/pages/ClientsPage';
import { ClientDetailPage } from '../../modules/clients/presentation/pages/ClientDetailPage';
import { AppointmentsPage } from '../../modules/appointments/presentation/pages/AppointmentsPage';
import { AppointmentsStatisticsPage } from '../../modules/appointments/presentation/pages/AppointmentsStatisticsPage';
import { AppointmentDetailPage } from '../../modules/appointments/presentation/pages/AppointmentDetailPage';
import { EditAppointmentPage } from '../../modules/appointments/presentation/pages/EditAppointmentPage';
import { RoomsPage } from '../../modules/rooms/presentation/pages/RoomsPage';
import { RoomDetailPage } from '../../modules/rooms/presentation/pages/RoomDetailPage';
import { RoomServicesPage } from '../../modules/room_services/presentation/pages/RoomServicesPage';
import { RoomServiceDetailPage } from '../../modules/room_services/presentation/pages/RoomServiceDetailPage';
import { RoomUsersPage } from '../../modules/room_users/presentation/pages/RoomUsersPage';
import { RoomUserDetailPage } from '../../modules/room_users/presentation/pages/RoomUserDetailPage';
import { RoomServiceUsersPage } from '../../modules/room_service_users/presentation/pages/RoomServiceUsersPage';
import { RoomServiceUserDetailPage } from '../../modules/room_service_users/presentation/pages/RoomServiceUserDetailPage';
import { CostsPage } from '../../modules/costs/presentation/pages/CostsPage';
import { CostDetailPage } from '../../modules/costs/presentation/pages/CostDetailPage';
import { AiAssistantPage } from '../../modules/ai_chat/presentation/pages/AiAssistantPage';
import { AiChatDetailPage } from '../../modules/ai_chat/presentation/pages/AiChatDetailPage';
import { SystemLogsPage } from '../../modules/system_logs/presentation/pages/SystemLogsPage';
import { SystemLogDetailPage } from '../../modules/system_logs/presentation/pages/SystemLogDetailPage';
import { TopEmployeesPage } from '../../modules/top_employees/presentation/pages/TopEmployeesPage';
import { MedicalRecordsPage } from '../../modules/medical_records/presentation/pages/MedicalRecordsPage';
import { MedicalRecordDetailPage } from '../../modules/medical_records/presentation/pages/MedicalRecordDetailPage';
import { MedicalPlansPage } from '../../modules/medical_plans/presentation/pages/MedicalPlansPage';
import { MedicalPlanDetailPage } from '../../modules/medical_plans/presentation/pages/MedicalPlanDetailPage';
import { NotificationsPage } from '../../modules/notifications/presentation/pages/NotificationsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <AppLayout><DashboardPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/clients',
    element: (
      <RequireAuth>
        <AppLayout><ClientsPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/clients/:id',
    element: (
      <RequireAuth>
        <AppLayout><ClientDetailPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/statistics/appointments',
    element: (
      <RequireAuth>
        <AppLayout><AppointmentsStatisticsPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/sections',
    element: (
      <RequireAuth>
        <AppLayout><SectionsPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/sections/:id/edit',
    element: (
      <RequireAuth>
        <AppLayout><EditSectionPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/appointments',
    element: (
      <RequireAuth>
        <AppLayout><AppointmentsPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/appointments/:id/edit',
    element: (
      <RequireAuth>
        <AppLayout><EditAppointmentPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/appointments/:id',
    element: (
      <RequireAuth>
        <AppLayout><AppointmentDetailPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/employees',
    element: (
      <RequireAuth>
        <AppLayout><EmployeesPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/employees/new',
    element: (
      <RequireAuth>
        <AppLayout><CreateEmployeePage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/employees/:id/edit',
    element: (
      <RequireAuth>
        <AppLayout><EditEmployeePage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/employees/:id/attendance-schedule-diff',
    element: (
      <RequireAuth>
        <AppLayout><AttendanceScheduleDiffPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/employees/:id',
    element: (
      <RequireAuth>
        <AppLayout><EmployeeDetailPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/rooms',
    element: (
      <RequireAuth>
        <AppLayout><RoomsPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/rooms/:id',
    element: (
      <RequireAuth>
        <AppLayout><RoomDetailPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/room-services',
    element: (
      <RequireAuth>
        <AppLayout><RoomServicesPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/room-services/:id',
    element: (
      <RequireAuth>
        <AppLayout><RoomServiceDetailPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/room-users',
    element: (
      <RequireAuth>
        <AppLayout><RoomUsersPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/room-users/:id',
    element: (
      <RequireAuth>
        <AppLayout><RoomUserDetailPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/room-service-users',
    element: (
      <RequireAuth>
        <AppLayout><RoomServiceUsersPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/room-service-users/:id',
    element: (
      <RequireAuth>
        <AppLayout><RoomServiceUserDetailPage /></AppLayout>
      </RequireAuth>
    ),
  },
    {
    path: '/costs',
    element: (
      <RequireAuth>
        <AppLayout><CostsPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/costs/:id',
    element: (
      <RequireAuth>
        <AppLayout><CostDetailPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/ai-assistant',
    element: (
      <RequireAuth>
        <AppLayout><AiAssistantPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/ai-assistant/:id',
    element: (
      <RequireAuth>
        <AppLayout><AiChatDetailPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/system-logs',
    element: (
      <RequireAuth>
        <AppLayout><SystemLogsPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/system-logs/:id',
    element: (
      <RequireAuth>
        <AppLayout><SystemLogDetailPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/top-employees',
    element: (
      <RequireAuth>
        <AppLayout><TopEmployeesPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/medical-records',
    element: (
      <RequireAuth>
        <AppLayout><MedicalRecordsPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/medical-records/:id',
    element: (
      <RequireAuth>
        <AppLayout><MedicalRecordDetailPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/medical-plans',
    element: (
      <RequireAuth>
        <AppLayout><MedicalPlansPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/medical-plans/:id',
    element: (
      <RequireAuth>
        <AppLayout><MedicalPlanDetailPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/notifications',
    element: (
      <RequireAuth>
        <AppLayout><NotificationsPage /></AppLayout>
      </RequireAuth>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};
