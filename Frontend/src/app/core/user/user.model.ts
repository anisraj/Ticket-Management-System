import { Role } from '../auth/auth-service';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';

export interface CreateUserRequest {
  name: string;
  age: number;
  gender: Gender;
  isActive: boolean;
  mobile: string;
  email: string;
  password: string;
  role: Role;
}

export interface UserDto {
  id: number;
  name: string;
  email: string;
  role: Role;
  age: number | null;
  gender: Gender | null;
  mobile: string | null;
  isActive: boolean;
}
