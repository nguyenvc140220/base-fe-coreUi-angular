import { Injectable } from '@angular/core';
import { BaseService } from '@shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@shared/ultils/config.service';
import { BaseResponse } from '@shared/models';
import { UserModel } from '@shared/models/users/user.model';

@Injectable({ providedIn: 'root' })
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
}
