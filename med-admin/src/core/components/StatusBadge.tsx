export type BadgeStatus = 'stable' | 'pending' | 'high' | 'normal' | 'completed' | 'in_progress';

export interface StatusBadgeProps {
  status: BadgeStatus;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const variant = ((): 'success' | 'warning' | 'danger' | 'default' => {
    switch (status) {
      case 'stable':
      case 'normal':
      case 'completed':
        return 'success';
      case 'pending':
      case 'in_progress':
        return 'warning';
      case 'high':
        return 'danger';
      default:
        return 'default';
    }
  })();

  return (
    <span className={`status-badge badge-${variant}`}>{label || status.replace('_', ' ').toUpperCase()}</span>
  );
}