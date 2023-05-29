import { Component, Injector, Input, OnInit } from '@angular/core';
import { ComponentBase } from "@shared/utils/component-base.component";
import { CampaignService } from "@shared/services/campaign/campaign.service";

@Component({
  selector: 'app-lead-interaction-table',
  templateUrl: './lead-interaction-table.component.html',
  styleUrls: ['./lead-interaction-table.component.scss']
})
export class LeadInteractionTableComponent extends ComponentBase<any> implements OnInit {

  @Input() leadId: string;
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

  constructor(injector: Injector, private readonly campaignService: CampaignService) {
    super(injector);
  }

  private initDataTable() {
    {
      this.cols = [
        { field: 'action', header: 'Hành động' },
        { field: 'createdAt', header: 'Thời gian thực hiện' },
        { field: 'updatedAt', header: 'Thời gian cập nhật' },
        { field: 'input', header: 'Dữ liệu đầu vào' },
        { field: 'status', header: 'Trạng thái' },
        { field: 'output', header: 'Kết quả đầu ra' },
      ];
    }
  }

  ngOnInit(): void {
    this.initDataTable();
    this.loadData();
  }

  loadData(){
    this.campaignService.getTestResults(this.leadId).subscribe((res) => {
      if(res.success){
        this.primengTableHelper.records = res.data;
      }
    });
  }

  getActionLabel(action: string): string {
    switch (action) {
      case 'AUTOCALL_IVR':
        return 'Gọi tự động';
      case 'AUTO_EMAIL':
        return 'Gửi mail tự động';
      case 'AUTO_CHAT':
        return 'Chat tự động';
      default:
        return 'Gọi tự động';
    }
  }

  getStateLabel(state: string): string {
    switch (state) {
      case 'RUNNING':
        return 'Đang thực hiện';
      case 'SUCCEEDED':
        return 'Thành công';
      case 'FAILED':
        return 'Thất bại';
      default:
        return 'Đang khởi tạo';
    }
  }

  getColor(state: string): string {
    switch (state) {
      case 'RUNNING':
        return 'info';
      case 'SUCCEEDED':
        return 'success';
      case 'FAILED':
        return 'danger';
      default:
        return 'warning';
    }
  }

}
