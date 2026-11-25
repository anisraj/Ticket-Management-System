export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}
