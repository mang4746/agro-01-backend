// export type UserStatus = 'ACTIVO' | 'INACTIVO' | 'SUSPENDIDO';
import { UserStatus } from "../constants";

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  status: UserStatus;
  roles: string[];
  firstName?: string;
  lastName?: string;
}
