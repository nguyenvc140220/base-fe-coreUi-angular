import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ComponentBase } from "@shared/utils/component-base.component";
import { ConfigService } from "@shared/utils/config.service";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";

@Component({
  selector: 'app-campaigns-table',
  templateUrl: './campaigns-table.component.html',
  styleUrls: ['./campaigns-table.component.scss']
})
export class CampaignsTableComponent extends ComponentBase<any> implements OnInit, OnDestroy {

  cols: { field: string; header: string; order?: number; styles?: { maxWidth: string; minWidth?: string } }[];

  mockData = [
    {
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

  constructor(
    injector: Injector,
    breadcrumbStore: BreadcrumbStore) {
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
        {field: 'name', header: 'Chiến dịch', styles: {maxWidth: '20%', minWidth: '200px'}},
        {field: 'script', header: 'Kịch bản', styles: {maxWidth: '15%', minWidth: '150px'}},
        {field: 'state', header: 'Trạng thái', styles: {maxWidth: '60px'}},
        {field: 'startTime', header: 'Ngày bắt đầu', styles: {maxWidth: '80px'}},
        {field: 'endTime', header: 'Ngày kết thúc', styles: {maxWidth: '80px'}},
        {field: 'thoseInCharge', header: 'Người phụ trách', styles: {maxWidth: '150px', minWidth: '120px'}},
        {field: 'numOfAgents', header: 'SL agents', styles: {maxWidth: '60px'}},
        {field: 'action', header: 'Thao tác', styles: {maxWidth: '60px'}},
        {field: 'lastModificationTime', header: 'Ngày cập nhật', styles: {maxWidth: '80px'}},
      ];
    }

    // this.loadData();
  }

  handleStateChange($event, campaign) {
    console.log($event, campaign)
  }

  handleRemove(campaign: any) {

  }
}
