import { type ReactNode } from 'react';

export type StatBadgeVariant = 'success' | 'warning' | 'danger' | 'info';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  badgeText?: string;
  badgeVariant?: StatBadgeVariant;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  badgeText,
  badgeVariant = 'info',
  onClick,
}: StatCardProps) {
  return (
    <article className="stat-card" onClick={onClick}>
      <div className="stat-card-header">
        {icon && <div className="stat-card-icon">{icon}</div>}
        {badgeText && <span className={`status-badge badge-${badgeVariant}`}>{badgeText}</span>}
      </div>
      <div className="stat-card-body">
        <p className="stat-card-title">{title}</p>
        <p className="stat-card-value">{value}</p>
        {subtitle && <span className="stat-card-subtitle">{subtitle}</span>}
      </div>
    </article>
  );
}