export class CreateUserRequestModel {
  username: string;
  email: string;
  fullName: string;
  roles: string[];
  groups: string[];
  enable: true
}
