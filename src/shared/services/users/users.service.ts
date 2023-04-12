import { Injectable } from '@angular/core';
import { BaseService } from '@shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@shared/utils/config.service';
import { BaseResponse } from '@shared/models';
import { UserModel } from '@shared/models/users/user.model';
import { CreateUserRequestModel } from '@shared/models/users/create-user-request-model';
import { UserValidatorRequestModel } from '@shared/models/users/user-validator-request-model';
import { UserValidatorResponseModel } from '@shared/models/users/user-validator-response-model';
import { DetailUserResponseModel } from '@shared/models/users/detail-user-response-model';
import { EditUserRequestModel } from '@shared/models/users/edit-user-request-model';
import { DynamicEntityTypeEnum } from "@shared/enums/dynamic-entity-type.enum";
import { DynamicQueryModel } from "@shared/models/dynamic-field/dynamic-query.model";
import { DynamicFieldService } from "@shared/services/dynamic-field/dynamic-field.service";

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
  constructor(
    protected http: HttpClient,
    protected configService: ConfigService,
    private dynamicFieldService: DynamicFieldService
  ) {
    super(http, configService);
  }

  getUsers(query: DynamicQueryModel) {
    query.index = DynamicEntityTypeEnum.USER;
    return this.dynamicFieldService.getDynamicEntity(query);
  }

  createUser(request: CreateUserRequestModel) {
    return this.defaultPost<BaseResponse<any>>(
      `${this.configService.keycloakUrl}/v1.0/account/admin-create-user`,
      request
    );
  }

  userValidators(requestModel: UserValidatorRequestModel) {
    return this.defaultGet<UserValidatorResponseModel>(
      `${this.configService.keycloakUrl}/v1.0/account/check-user-existed`,
      requestModel
    );
  }

  getUserById(UserId: string) {
    return this.defaultGet<DetailUserResponseModel>(
      `${this.configService.keycloakUrl}/v1.0/account/find-by-id`,
      { id: UserId }
    );
  }

  updateUserById(request: EditUserRequestModel) {
    return this.defaultPost<BaseResponse<UserModel>>(
      `${this.configService.keycloakUrl}/v1.0/account/update`,
      { request }
    );
  }
}
