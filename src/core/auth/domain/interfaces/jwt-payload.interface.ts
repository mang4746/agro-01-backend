export interface JwtPayload {
  sub: string;
  username: string;
  email?: string;
  roles?: string[];
  iat?: number;
  exp?: number;
}
