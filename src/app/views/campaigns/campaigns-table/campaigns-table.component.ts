import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ComponentBase } from "@shared/utils/component-base.component";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { Router } from "@angular/router";

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

  mockData = [
    {
      id: 'id1',
      name: 'Chiến dịch 1',
      script: 'Kịch bản bấm phím 1',
      state: 'PENDING',
      startTime: new Date().getTime(),
      endTime: new Date().getTime(),
      thoseInCharge: 'Ê giần 1, Ê giần 12, Ê giần 3',
      numOfAgents: 10,
      action: '',
      lastModificationTime: new Date().getTime()
    },
    {
      id: 'id2',
      name: 'Chiến dịch 2',
      script: 'Kịch bản bấm phím 1',
      state: 'RUNNING',
      startTime: new Date().getTime(),
      endTime: new Date().getTime(),
      thoseInCharge: 'Ê giần 1, Ê giần 12, Ê giần 3',
      numOfAgents: 10,
      action: '',
      lastModificationTime: new Date().getTime()
    },
    {
      id: 'id3',
      name: 'Chiến dịch 3',
      script: 'Kịch bản bấm phím 1',
      state: 'FINISH',
      startTime: new Date().getTime(),
      endTime: new Date().getTime(),
      thoseInCharge: 'Ê giần 1, Ê giần 12, Ê giần 3',
      numOfAgents: 10,
      action: '',
      lastModificationTime: new Date().getTime()
    },
    {
      id: 'id4',
      name: 'Chiến dịch 4',
      script: 'Kịch bản bấm phím 1',
      state: 'PAUSE',
      startTime: new Date().getTime(),
      endTime: new Date().getTime(),
      thoseInCharge: 'Ê giần 1, Ê giần 12, Ê giần 3',
      numOfAgents: 10,
      action: '',
      lastModificationTime: new Date().getTime()
    }
  ];
  currentState: boolean;

  constructor(injector: Injector, breadcrumbStore: BreadcrumbStore, private readonly router: Router) {
    super(injector);

    breadcrumbStore.items = [{label: 'Quản lý chiến dịch'}];
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.initDataTable();

    this.primengTableHelper.records = this.mockData;
    this.primengTableHelper.totalRecordsCount = this.mockData.length;
  }

  paginate($event: any) {

  }

  private initDataTable() {
    {
      this.cols = [
        {field: 'name', header: 'Chiến dịch', styles: {minWidth: '200px'}, sortable: true},
        {field: 'script', header: 'Kịch bản', styles: {minWidth: '200px'}},
        {field: 'state', header: 'Trạng thái', styles: {minWidth: '160px'}},
        {field: 'startTime', header: 'Ngày bắt đầu', styles: {minWidth: '200px'}, sortable: true},
        {field: 'endTime', header: 'Ngày kết thúc', styles: {minWidth: '200px'}, sortable: true},
        {field: 'thoseInCharge', header: 'Người phụ trách', styles: {minWidth: '300px'}},
        {field: 'numOfAgents', header: 'SL agents', styles: {minWidth: '200px'}},
        {field: 'action', header: 'Thao tác', styles: {minWidth: '160px'}},
        {field: 'lastModificationTime', header: 'Ngày cập nhật', styles: {minWidth: '200px'}, sortable: true},
      ];
    }

    // this.loadData();
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
    await this.router.navigate(['campaigns/create']);
  }
}
