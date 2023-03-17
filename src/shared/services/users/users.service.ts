import { Injectable } from '@angular/core';
import { BaseService } from '@shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@shared/ultils/config.service';
import { BaseResponse } from '@shared/models';
import { UserModel } from '@shared/models/users/user.model';
import { CreateUserRequestModel } from "@shared/models/users/create-user-request-model";

@Injectable({providedIn: 'root'})
export class UsersService extends BaseService {
  constructor(
    protected http: HttpClient,
    protected configService: ConfigService
  ) {
    super(http, configService);
  }

  getUsers(enabled: boolean, page: number, pageSize) {
    return this.defaultGet<BaseResponse<UserModel>>(
      `${this.configService.keycloakUrl}/v1.0/account/list`,
      {
        page: page,
        pageSize: pageSize,
        enabled: enabled,
      }
    );
  }

  createUser(request: CreateUserRequestModel) {
    return this.defaultPost<BaseResponse<any>>(
      `${this.configService.keycloakUrl}/v1.0/account/admin-create-user`,
      request
    );
  }
}
