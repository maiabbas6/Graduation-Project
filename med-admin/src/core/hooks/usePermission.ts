import { useMemo } from 'react';
import type { UserModel } from '../../modules/auth/data/models/UserModel';

function getUserFromStorage(): UserModel | null {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    return JSON.parse(raw) as UserModel;
  } catch {
    return null;
  }
}

export function usePermission(permission: string): boolean {
  return useMemo(() => {
    const user = getUserFromStorage();
    if (!user) return false;
    return user.permissions.includes(permission);
  }, [permission]);
}

export function useAnyPermission(permissions: string[]): boolean {
  return useMemo(() => {
    const user = getUserFromStorage();
    if (!user) return false;
    return permissions.some((p) => user.permissions.includes(p));
  }, [permissions]);
}
