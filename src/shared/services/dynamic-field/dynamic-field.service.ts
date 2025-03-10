import { Injectable } from '@angular/core';
import { BaseService } from '@shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@shared/utils/config.service';
import { DynamicQueryModel } from '@shared/models/dynamic-field/dynamic-query.model';
import { BackendBaseResponse } from '@shared/models/backend-base-response.model';
import { DynamicBaseResponseModel } from '@shared/models/dynamic-base-response.model';
import { DynamicPropertyRequestModel } from '@shared/models/dynamic-field/dynamic-property-request.model';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { DynamicEntityModel } from '@shared/models/dynamic-field/dynamic-response.model';
import { DynamicEntityCreateModel } from '@shared/models/dynamic-field/dynamic-entity-create.model';
import { DynamicEntityEditModel } from "@shared/models/dynamic-field/dynamic-entity-edit.model";
import { DynamicPropertyUpdateModel } from '@shared/models/dynamic-field/dynamic-property-update.model';
import { BaseResponse } from '@shared/models';
import { DynamicPropertyDeleteModel } from '@shared/models/dynamic-field/dynamic-property-delete.model';
import { DynamicPropertyCreateModel } from "@shared/models/dynamic-field/dynamic-property-create.model";
import { DynamicPropertyAddToEntityModel } from "@shared/models/dynamic-field/dynamic-property-add-to-entity.model";

@Injectable({providedIn: 'root'})
export class DynamicFieldService extends BaseService {
  constructor(
    protected http: HttpClient,
    protected configService: ConfigService
  ) {
    super(http, configService);
  }

  getDynamicProperties(request: DynamicPropertyRequestModel) {
    return this.defaultGet<
      BackendBaseResponse<DynamicBaseResponseModel<DynamicPropertyModel>>
    >(`${this.configService.mktBackendUrl}/v1.0/property`, request);
  }
  updateDynamicProperty(request: DynamicPropertyUpdateModel) {
    return this.defaultPut<
      BackendBaseResponse<BaseResponse<Boolean>>
    >(`${this.configService.mktBackendUrl}/v1.0/property`, request);
  }
  deleteDynamicProperty(request: DynamicPropertyDeleteModel) {
    return this.defaultDelete<
      BackendBaseResponse<BaseResponse<Boolean>>
    >(`${this.configService.mktBackendUrl}/v1.0/property`, request);
  }
  getDynamicEntity(query: DynamicQueryModel) {
    return this.defaultPost<
      BackendBaseResponse<DynamicBaseResponseModel<DynamicEntityModel>>
    >(`${this.configService.elasticQuery}/v1.0/search`, query);
  }

  createDynamicEntity(request: DynamicEntityCreateModel) {
    return this.defaultPost<
      BackendBaseResponse<DynamicBaseResponseModel<DynamicEntityModel>>
    >(`${this.configService.mktBackendUrl}/v1.0/entity`, request);
  }

  updateDynamicEntity(request: DynamicEntityEditModel) {
    return this.defaultPut<
      BackendBaseResponse<DynamicBaseResponseModel<DynamicEntityModel>>
    >(`${this.configService.mktBackendUrl}/v1.0/entity/update`, request);
  }

  createDynamicProperty(request: DynamicPropertyCreateModel) {
    return this.defaultPost<
      BackendBaseResponse<DynamicBaseResponseModel<DynamicEntityModel>>
    >(`${this.configService.mktBackendUrl}/v1.0/property`, request);
  }

  addPropertyToDynamicType(request: DynamicPropertyAddToEntityModel) {
    return this.defaultPost<
      BackendBaseResponse<DynamicBaseResponseModel<DynamicEntityModel>>
    >(`${this.configService.mktBackendUrl}/v1.0/entity-type/add-property`, request);
  }
}
