import { BaseService } from '@shared/services/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@shared/utils/config.service';
import { BaseResponse, PageResponse } from '@shared/models';
import { CampaignListModel } from '@shared/models/campaign/campaign-list.model';
import { CreateCampaignRequestModel } from '@shared/models/campaign/create-campaign-request.model';
import { TestCampaignRequestModel } from '@shared/models/campaign/test-campaign-request.model';
import { CampaignInteractionModel } from '@shared/models/campaign/campaign-interaction.model';
import { LeadModel } from '@shared/models/campaign/lead.model';
import { BackendBaseResponse } from "@shared/models/backend-base-response.model";

@Injectable({providedIn: 'root'})
export class CampaignService extends BaseService {
  constructor(
    protected http: HttpClient,
    protected configService: ConfigService
  ) {
    super(http, configService);
  }

  getCampaigns(
    searchKey: string,
    page: number,
    pageSize: number | null,
    orderBy = {field: 'updatedAt,createdAt', direction: -1}
  ) {
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
      `${this.configService.campaignPlanningUrl}/campaign`,
      params
    );
  }

  createCampaign(body: CreateCampaignRequestModel) {
    return this.defaultPost<BaseResponse<any>>(
      `${this.configService.campaignPlanningUrl}/campaign`,
      body
    );
  }

  updateCampaign(body: CreateCampaignRequestModel) {
    return this.defaultPut<BaseResponse<any>>(
      `${this.configService.campaignPlanningUrl}/campaign/update/${body.id}`,
      body
    );
  }

  changeStatus(campaignId: string, status: string) {
    return this.defaultPut<{ success: boolean; message?: string }>(
      `${this.configService.campaignPlanningUrl}/campaign/status`,
      {campaignId, status}
    );
  }

  testCampaign(body: TestCampaignRequestModel) {
    return this.defaultPost<LeadModel>(
      `${this.configService.campaignPlanningUrl}/campaign/test`,
      body
    );
  }

  getTestResults(leadId: string) {
    return this.defaultGet<BackendBaseResponse<CampaignInteractionModel[]>>(
      `${this.configService.campaignPlanningUrl}/campaign/result/${leadId}`,
      null
    );
  }

  getCampaignLeads(campaignId: string, skip: number, take: number) {
    return this.defaultGet<BackendBaseResponse<LeadModel[]>>(
      `${this.configService.campaignPlanningUrl}/campaign/leads`,
      {
        campaignId: campaignId,
        skip: skip,
        take: take
      }
    );
  }
}
