export class AuthModel {
  roles: string[];
  request_action: string[];
  access_token?: string;
  refresh_token?: string;
  status: string;
  remember_me: boolean;
}
