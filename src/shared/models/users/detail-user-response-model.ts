import { UserModel } from "@shared/models/users/user.model";

export class DetailUserResponseModel {
  statusCode: number;
  message: string;
  data?: UserModel;
  total?: number | null
}
