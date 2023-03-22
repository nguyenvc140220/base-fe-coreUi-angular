export class AuthModel {
  username: string;
  roles: string[];
  request_action: string[];
  expires_in: number;
  refresh_expires_in: number;
  access_token?: string;
  refresh_token?: string;
  status: string;
  remember_me: boolean;
}
