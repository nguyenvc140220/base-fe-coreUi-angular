import { BaseService } from '@shared/services/base.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '@shared/utils/config.service';
import { DynamicQueryModel } from '@shared/models/dynamic-field/dynamic-query.model';
import { DynamicFieldService } from '@shared/services/dynamic-field/dynamic-field.service';
import { DynamicPropertyRequestModel } from '@shared/models/dynamic-field/dynamic-property-request.model';
import { DynamicEntityTypeEnum } from '@shared/enums/dynamic-entity-type.enum';
import { Observable } from "rxjs";
import { BackendBaseResponse } from "@shared/models/backend-base-response.model";
import { HeaderMappingRequestModel } from "@shared/models/contacts/header-mapping-request-model";

@Injectable({providedIn: 'root'})
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

  upLoadFile(body: FormData | undefined): Observable<any> {
    let url_ = `${this.configService.mktBackendUrl}/v1.0/contacts/import`
    return this.http.post<any>(url_, body)
  }

  addHeaderMapping(request: HeaderMappingRequestModel) {
    return this.defaultPost<
      BackendBaseResponse<any>
    >(`${this.configService.mktBackendUrl}/v1.0/contacts/add-header-mapping`, request);
  }
}
