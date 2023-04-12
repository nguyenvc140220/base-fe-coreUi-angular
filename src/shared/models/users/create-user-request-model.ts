export class CreateUserRequestModel {
  username: string;
  email: string;
  userFullName: string;
  code: string;
  roles: string[];
  enable: boolean;
}
