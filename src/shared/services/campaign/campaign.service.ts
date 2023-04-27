import { BaseService } from "@shared/services/base.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@shared/utils/config.service";
import { BaseResponse, PageResponse } from "@shared/models";
import { CampaignListModel } from "@shared/models/campaign/campaign-list.model";
import { CreateCampaignModel } from "@shared/models/campaign/create-campaign.model";
import { CreateCampaignRequestModel } from "@shared/models/campaign/create-campaign-request.model";

@Injectable({providedIn: 'root'})
export class CampaignService extends BaseService {

  constructor(
    protected http: HttpClient,
    protected configService: ConfigService
  ) {
    super(http, configService);
  }

  getCampaigns(searchKey: string,
               page: number,
               pageSize: number | null,
               orderBy = { field: 'updatedAt,createdAt', direction: -1 }) {
    const params = {
      skip: (page - 1) * pageSize,
      take: pageSize,
      keyword: searchKey,
    };

    if (orderBy) {
      if (orderBy.direction === 1) {
        params['orderByAsc'] = orderBy.field;
      } else if (orderBy.direction === -1) {
        params['orderByDesc'] = orderBy.field;
      } else {
        params['orderByDesc'] = 'updatedAt,createdAt';
      }
    }

    return this.defaultGet<BaseResponse<CampaignListModel>>(
      `${this.configService.campaignPlanningUrl}/campaign`, params
    );
  }

  createCampaign(body: CreateCampaignRequestModel) {
    return this.defaultPost<BaseResponse<any>>(
      `${this.configService.campaignPlanningUrl}/campaign`, body
    );
  }
}
