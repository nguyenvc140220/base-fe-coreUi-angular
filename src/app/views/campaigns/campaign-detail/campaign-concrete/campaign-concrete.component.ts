import { Component, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ComponentBase } from "@shared/utils/component-base.component";
import { DynamicFilterComponent } from "@shared/components/dynamic-filter/dynamic-filter.component";
import { DynamicEntityTypeEnum } from "@shared/enums/dynamic-entity-type.enum";
import { DialogService } from "primeng/dynamicdialog";
import { DynamicQueryModel } from "@shared/models/dynamic-field/dynamic-query.model";

@Component({
  selector: 'app-campaign-concrete',
  templateUrl: './campaign-concrete.component.html',
  styleUrls: ['./campaign-concrete.component.scss']
})
export class CampaignConcreteComponent extends ComponentBase<any> implements OnInit {

  query: DynamicQueryModel = {
    payload: {},
  };

  constructor(
    injector: Injector,
    private readonly router: Router,
    private readonly dialogService: DialogService) {
    super(injector);
  }

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
      phoneNumber: '0987654321',
      fullName: 'Khách hàng ',
      address: 'PENDING',
      gender: 'Nam',
      numOfCalls: 5,
      lastCallStatus: 'Nghe máy'
    },
    {
      id: 'id2',
      phoneNumber: '0987654322',
      fullName: 'Khách hàng ',
      address: 'PENDING',
      gender: 'Nam',
      numOfCalls: 2,
      lastCallStatus: 'Nhỡ'
    },
    {
      id: 'id3',
      phoneNumber: '0987654323',
      fullName: 'Khách hàng ',
      address: 'PENDING',
      gender: 'Nữ',
      numOfCalls: 5,
      lastCallStatus: 'Máy bận'
    },
    {
      id: 'id4',
      phoneNumber: '0987654324',
      fullName: 'Khách hàng ',
      address: 'PENDING',
      gender: 'Nữ',
      numOfCalls: 1,
      lastCallStatus: 'Không nghe máy'
    },
    {
      id: 'id5',
      phoneNumber: '0987654325',
      fullName: 'Khách hàng ',
      address: 'PENDING',
      gender: 'Nữ',
      numOfCalls: 3,
      lastCallStatus: 'Không nghe máy'
    }
  ];

  paginate($event: any) {

  }

  ngOnInit(): void {
    this.initDataTable();
  }

  private initDataTable() {
    {
      this.cols = [
        {field: 'phoneNumber', header: 'Số điện thoại', styles: {minWidth: '120px'}},
        {field: 'fullName', header: 'Họ tên', styles: {minWidth: '180px'}},
        {field: 'address', header: 'Địa chỉ', styles: {minWidth: '200px'}},
        {field: 'gender', header: 'Giới tính', styles: {minWidth: '80px'}},
        {field: 'lastCallStatus', header: 'Trạng thái gọi gần nhất', styles: {minWidth: '160px'}},
        {field: 'numOfCalls', header: 'Số lần gọi', styles: {minWidth: '80px'}},
      ];
    }
    this.primengTableHelper.records = this.mockData;
    this.primengTableHelper.totalRecordsCount = this.mockData.length;

    this.primengTableHelper.predefinedRecordsCountPerPage = [10, 50, 100, 150];
    this.primengTableHelper.defaultRecordsCountPerPage = 100;
  }

  handleRefresh($event: MouseEvent) {
    this.primengTableHelper.isLoading = true;

    setTimeout(() => this.primengTableHelper.isLoading = false, 300);
  }

  showDynamicFilter() {
    const dialog = this.dialogService.open(DynamicFilterComponent, {
      header: 'Bộ lọc khách hàng',
      width: '60%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      data: { type: DynamicEntityTypeEnum.LEAD },
    });
    dialog.onClose.subscribe((res) => {
      if (res) {
        this.query.payload = res;
        // this.loadData(null);
      }
    });
  }

  async navigate(route: string, contactId: string) {
    // await  this.router.navigate([route, '4059cb14-3ebf-4327-9dc4-7de3bb1fcb4c']);
   await this.router.navigate(['contacts/detail', '4059cb14-3ebf-4327-9dc4-7de3bb1fcb4c']);
  }
}
