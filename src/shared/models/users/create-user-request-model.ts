export class CreateUserRequestModel {
  username: string;
  email: string;
  fullName: string;
  code: string;
  roles: string[];
  groups: string[];
  enable: boolean;
  createdAt: string;
}
