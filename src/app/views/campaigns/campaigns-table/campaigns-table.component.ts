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
      {field: 'name', header: 'Chiến dịch', styles: {minWidth: '200px'}, sortable: true},
      {field: 'campaignScriptId', header: 'Kịch bản', styles: {minWidth: '200px'}},
      {field: 'state', header: 'Trạng thái', styles: {minWidth: '120px'}},
      {field: 'realStartTime', header: 'Ngày bắt đầu', styles: {minWidth: '200px'}, sortable: true},
      {field: 'realEndTime', header: 'Ngày kết thúc', styles: {minWidth: '200px'}, sortable: true},
      {field: 'thoseInCharge', header: 'Người phụ trách', styles: {minWidth: '250px'}},
      {field: 'numOfAgents', header: 'SL agents', styles: {minWidth: '200px'}},
      {field: 'updatedAt', header: 'Ngày cập nhật', styles: {minWidth: '200px'}, sortable: true},
    ];

    this.primengTableHelper.predefinedRecordsCountPerPage = [10, 50, 100, 150];
    this.primengTableHelper.defaultRecordsCountPerPage = 100;

    this.loadData();
  }

  loadData(event?: any) {
    this.primengTableHelper.isLoading = true;

    const currentPage = !event ? 1 : this.primengTableHelper.getCurrentPage(this.paginator) ?? 1;
    const pageSize = this.primengTableHelper.getMaxResultCount(this.paginator, event)
      ?? this.primengTableHelper.defaultRecordsCountPerPage;

    this.searchKey = !this.searchKey ? '' : this.searchKey.trim();
    this.campaignService
      .getCampaigns(
        this.searchKey,
        currentPage,
        pageSize
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
          this.primengTableHelper.isLoading = false;
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
          this.primengTableHelper.isLoading = false;
        }
      })
  }

  handleStateChange($event, campaign) {
    console.log($event, campaign)
  }

  handleRemove(campaign: any) {

  }

  handleSort($event: any) {
    console.log($event);
  }

  async navigate(route: string, id: string) {
    if (!route || !id) return;

    await this.router.navigate([route], {
      queryParams: {id, name: 'Chào hàng 1'}
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
      case 'PENDING':
        return 'Đang chờ';
      case 'RUNNING':
        return 'Đang chạy';
      case 'PAUSE':
        return 'Tạm dừng';
      default:
        return 'Kết thúc';
    }
  }

  getColor(state: string): string {
    switch (state) {
      case 'PENDING':
        return 'info';
      case 'RUNNING':
        return 'success';
      case 'PAUSE':
        return 'Warning';
      default:
        return 'danger';
    }
  }
}
