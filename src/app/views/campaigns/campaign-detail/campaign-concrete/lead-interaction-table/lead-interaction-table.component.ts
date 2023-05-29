import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { ComponentBase } from "@shared/utils/component-base.component";
import { CampaignService } from "@shared/services/campaign/campaign.service";
import { SocketService } from "@shared/services/socket/socket.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-lead-interaction-table',
  templateUrl: './lead-interaction-table.component.html',
  styleUrls: ['./lead-interaction-table.component.scss']
})
export class LeadInteractionTableComponent extends ComponentBase<any> implements OnInit, OnDestroy {

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
  private _interactionsSub: Subscription;
  constructor(injector: Injector, private readonly campaignService: CampaignService, private  readonly  socketService: SocketService) {
    super(injector);
    this._interactionsSub = this.socketService.getWorkflowInteractionMessage().subscribe((data)=>{
      if(data.leadId === this.leadId){
        this.loadData();
      }
    });
  }

  ngOnDestroy(): void {
    if (this._interactionsSub) this._interactionsSub.unsubscribe();
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
