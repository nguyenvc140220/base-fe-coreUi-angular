import { ChangeDetectorRef, Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ComponentBase } from "@shared/utils/component-base.component";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { Router } from "@angular/router";
import { CampaignService } from "@shared/services/campaign/campaign.service";
import { Subject, takeUntil } from "rxjs";
import { BaseResponse } from "@shared/models";
import { Paginator } from "primeng/paginator";
import { CampaignListModel } from "@shared/models/campaign/campaign-list.model";
import { MessageService } from "primeng/api";
import * as uuid from 'uuid';
import { DynamicEntityTypeEnum } from "@shared/enums/dynamic-entity-type.enum";
import { DynamicModeEnum } from "@shared/enums/dynamic-mode.enum";

@Component({
  selector: 'app-campaigns-table',
  templateUrl: './campaigns-table.component.html',
  styleUrls: ['./campaigns-table.component.scss']
})
export class CampaignsTableComponent extends ComponentBase<any> implements OnInit, OnDestroy {

  cols: {
    field: string;
    header: string;
    order?: number;
    styles?: {
      width?: string;
      maxWidth?: string;
      minWidth?: string
    },
    sortable?: boolean
  }[];

  searchKey: string = '';
  orderBy?: { field: string; direction: (1 | -1) };

  @ViewChild('paginator') paginator: Paginator;
  definitionId = uuid.v4();

  constructor(
    injector: Injector,
    breadcrumbStore: BreadcrumbStore,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly campaignService: CampaignService) {
    super(injector);

    breadcrumbStore.items = [{label: 'Quản lý chiến dịch'}];
  }

  private unsubscribe = new Subject();

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.initDataTable();
  }

  paginate(event?) {
    this.loadData(event);
  }

  private initDataTable() {
    this.cols = [
      {field: 'id', header: 'ID', styles: {width: '50px'}},
      {field: 'name', header: 'Chiến dịch', styles: {minWidth: '200px'}, sortable: true},
      {field: 'campaignScriptId', header: 'Kịch bản', styles: {minWidth: '200px'}},
      {field: 'state', header: 'Trạng thái', styles: {minWidth: '120px'}},
      {field: 'realStartTime', header: 'Ngày bắt đầu', styles: {minWidth: '200px'}, sortable: true},
      {field: 'realEndTime', header: 'Ngày kết thúc', styles: {minWidth: '200px'}, sortable: true},
      {field: 'updatedAt', header: 'Ngày cập nhật', styles: {minWidth: '200px'}, sortable: true},
      {field: 'thoseInCharge', header: 'Người phụ trách', styles: {minWidth: '250px'}},
      // {field: 'numOfAgents', header: 'SL agents', styles: {minWidth: '200px'}},
    ];

    this.loadData();
  }

  loadData(event?: any) {
    this.primengTableHelper.showLoadingIndicator();

    const currentPage = !event ? 1 : this.primengTableHelper.getCurrentPage(this.paginator) ?? 1;
    const pageSize = this.primengTableHelper.getMaxResultCount(this.paginator, event)
      ?? this.primengTableHelper.defaultRecordsCountPerPage;

    this.searchKey = !this.searchKey ? '' : this.searchKey.trim();
    this.campaignService
      .getCampaigns(
        this.searchKey,
        currentPage,
        pageSize,
        this.orderBy
      )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (res: BaseResponse<CampaignListModel>) => {
          this.primengTableHelper.totalRecordsCount = res.total ?? 0;

          const data = [];
          const users = res.users ?? {};
          for (const entry of res.data) {
            const agentIds = !entry.agentIds || entry.agentIds.trim() === '' ? [] : entry.agentIds.split(',');
            const thoseInCharge = agentIds.map(id => users[id]?.username ?? '')?.join(', ');
            data.push({...entry, thoseInCharge, numOfAgents: agentIds.length});
          }

          this.primengTableHelper.records = data;
        },
        error: err => {
          this.primengTableHelper.hideLoadingIndicator();
          this.primengTableHelper.records = [];
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Tải danh sách chiến dịch không thành công. Vui lòng thử lại!`,
          });
          console.error(`Tải danh sách chiến dịch không thành công: `, err);
          this.cdr.detectChanges();
        },
        complete: () => {
          this.primengTableHelper.hideLoadingIndicator();
        }
      })
  }

  handleStateChange(campaign: CampaignListModel, status) {
    if (!campaign || !status || campaign.campaignStatus === status) {
      return;
    }

    this.primengTableHelper.showLoadingIndicator();
    this.campaignService.changeStatus(campaign.id, status)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: val => {
          if (val.success) {
            campaign.campaignStatus = status;
          }
        },
        error: err => {
          this.primengTableHelper.hideLoadingIndicator();
          console.error(`Cannot change campaign ${campaign.id}`);
        },
        complete: () => {
          this.primengTableHelper.hideLoadingIndicator();
        }
      });
  }

  handleRemove(campaign: any) {

  }

  handleSort($event: any) {
    this.orderBy = {field: $event.field, direction: $event.order};

    this.loadData();
  }

  async navigate(route: string, campaign: CampaignListModel) {
    if (!route || !campaign?.id) return;

    await this.router.navigate([route], {
      queryParams: campaign
    })
  }

  async routeAddCampaign() {
    await this.router.navigate(
      [
        'campaigns/create'
      ],
      {state: {definitionId: this.definitionId}}
    );
  }

  getStateLabel(state: string): string {
    switch (state) {
      case 'WAITING':
        return 'Đang chờ';
      case 'HAPPENING':
        return 'Đang chạy';
      case 'PAUSED':
        return 'Tạm dừng';
      default:
        return 'Kết thúc';
    }
  }

  getColor(state: string): string {
    switch (state) {
      case 'WAITING':
        return 'info';
      case 'HAPPENING':
        return 'success';
      case 'PAUSED':
        return 'Warning';
      default:
        return 'danger';
    }
  }

  getStatus(campaign: CampaignListModel) {
    return campaign.campaignStatus;
  }

  editCampaign(campaign) {
    this.router.navigate(
      [
        'campaigns/edit',
        {
          mode: 'EDIT',
        },
      ],
      {state: {campaign: campaign}}
    );
  }
}
