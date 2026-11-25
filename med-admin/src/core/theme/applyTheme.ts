export type ThemeName = 'dark' | 'light';

export function applyTheme(theme: ThemeName): void {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('med-admin-theme', theme);
}

export function getStoredTheme(): ThemeName {
  const stored = localStorage.getItem('med-admin-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return 'dark';
}
