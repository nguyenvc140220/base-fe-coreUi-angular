export class EditUserRequestModel {
  id?: string;
  username: string | null;
  email: string | null;
  code: string | null;
  fullName: string;
  roles: string[];
  groups: string[];
  enable: boolean;
  createdAt: string | null;
}
