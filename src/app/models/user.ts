export interface User {
  id?: number;
  name: string;
  last_name: string;
  email: string;
  password?: string;

  birth_date?: string;
  gender?: string;
  profession?: string;
  phone?: string;

  active?: boolean;
  created_at?: string;
}
