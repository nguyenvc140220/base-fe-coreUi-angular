export class UserModel {
  id: string;
  username: string;
  password: string;
  email: string;
  fullName: string;
  code: string;
  roles: string[];
  groups: string[];
  enable: boolean;
  createdAt: Date;
  phone: string | null
}
