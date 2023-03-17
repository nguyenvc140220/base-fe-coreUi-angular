export class AuthModel {
  username: string;
  roles: string[];
  request_action: string[];
  access_token?: string;
  refresh_token?: string;
  status: string;
  remember_me: boolean;
}
