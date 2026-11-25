import { icons } from './iconRegistry';

interface DashboardIconProps {
  name: string;
  className?: string;
}

export function DashboardIcon({ name, className }: DashboardIconProps) {
  const src = icons[name as keyof typeof icons];
  if (!src) return null;
  return <img src={src} alt="" className={className} />;
}