import { BaseService } from '@shared/services/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@shared/ultils/config.service';
import { DynamicQueryModel } from '@shared/models/dynamic-field/dynamic-query.model';
import { DynamicFieldService } from '@shared/services/dynamic-field/dynamic-field.service';
import { DynamicPropertyRequestModel } from '@shared/models/dynamic-field/dynamic-property-request.model';
import { DynamicEntityTypeEnum } from '@shared/enums/dynamic-entity-type.enum';

@Injectable({ providedIn: 'root' })
export class ContactService extends BaseService {
  constructor(
    protected http: HttpClient,
    protected configService: ConfigService,
    private dynamicFieldService: DynamicFieldService
  ) {
    super(http, configService);
  }

  getContactProperties(request: DynamicPropertyRequestModel) {
    request.type = DynamicEntityTypeEnum.CONTACT;
    return this.dynamicFieldService.getDynamicProperties(request);
  }

  getContacts(query: DynamicQueryModel) {
    query.index = DynamicEntityTypeEnum.CONTACT;
    return this.dynamicFieldService.getDynamicEntity(query);
  }
}
