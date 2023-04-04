import { BaseService } from "@shared/services/base.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@shared/utils/config.service";
import { BaseResponse, PageResponse } from "@shared/models";
import { SegmentationListModel } from "@shared/models/segmentation/segmentation-list.model";

@Injectable({providedIn: 'root'})
export class SegmentationService extends BaseService {

  constructor(
    protected http: HttpClient,
    protected configService: ConfigService
  ) {
    super(http, configService);
  }

  getSegmentations(searchKey: string, page: number, pageSize: number | null) {
    return this.defaultGet<PageResponse<SegmentationListModel>>(
      `${this.configService.mktBackendUrl}/v1.0/segmentation`,
      {
        page: page,
        size: pageSize,
        keyword: searchKey,
      }
    );
  }
}
