import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { appNavItems } from '../const/appNav';
import { DashboardIcon } from '../../modules/dashboard/presentation/components/DashboardIcon';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="app-shell">
      <Header />
      <div className="app-body">
        <nav className="app-sidebar" aria-label="Main navigation">
          {appNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            >
              <DashboardIcon name={item.icon} className="sidebar-icon" />
              <span className="sidebar-label">{t(item.labelKey)}</span>
            </NavLink>
          ))}
        </nav>
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}
