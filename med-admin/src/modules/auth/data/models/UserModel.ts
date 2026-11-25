export interface UserModel {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  phone: string;
  birth: string | null;
  address: string;
  roles: string[];
  permissions: string[];
  employee: unknown;
}