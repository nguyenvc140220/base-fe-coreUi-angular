import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentBase } from "@shared/utils/component-base.component";
import { DynamicFilterComponent } from "@shared/components/dynamic-filter/dynamic-filter.component";
import { DynamicEntityTypeEnum } from "@shared/enums/dynamic-entity-type.enum";
import { DialogService } from "primeng/dynamicdialog";
import { DynamicQueryModel } from "@shared/models/dynamic-field/dynamic-query.model";
import { LeadInteractionModalComponent } from "./lead-interaction-modal/lead-interaction-modal.component";
import { CampaignService } from "@shared/services/campaign/campaign.service";
import { Paginator } from "primeng/paginator";

@Component({
  selector: 'app-campaign-concrete',
  templateUrl: './campaign-concrete.component.html',
  styleUrls: ['./campaign-concrete.component.scss']
})
export class CampaignConcreteComponent extends ComponentBase<any> implements OnInit {

  query: DynamicQueryModel = {
    payload: {},
  };

  lastRefreshTime: Date;

  campaignId = '';

  @ViewChild('paginator') paginator: Paginator;
  constructor(
    injector: Injector,
    private readonly router: Router,
    private readonly dialogService: DialogService,

    private  readonly  campainService: CampaignService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super(injector);
    this.activatedRoute.queryParams.subscribe(params => {
      this.campaignId = params['id'];
      if(this.campaignId)
        this.initDataTable();
    });
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

  paginate(event: any) {
    this.loadData(event);
  }

  ngOnInit(): void {
    // this.initDataTable();
  }

  private initDataTable() {
    {
      this.cols = [
        {field: 'id', header: 'ID', styles: {minWidth: '180px'}},
        {field: 'contactId', header: 'Mã liên hệ', styles: {minWidth: '180px'}},
        {field: 'createdAt', header: 'Ngày tạo', styles: {minWidth: '100px'}},
        {field: 'updatedAt', header: 'Ngày cập nhật', styles: {minWidth: '100px'}},
        {field: 'attemps', header: 'Số lần thử', styles: {minWidth: '80px'}},
      ];
    }

    this.loadData(null);
  }

  loadData(event) {
    this.lastRefreshTime = new Date();
    this.primengTableHelper.isLoading = true;
    this.campainService.getCampaignLeads(
      this.campaignId,
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator,event))
      .subscribe((res) => {
      this.primengTableHelper.isLoading = false;
      if (res.success == true) {
        this.primengTableHelper.records = res.data;
        this.primengTableHelper.totalRecordsCount = res.total;
      }
    });
  }

  handleRefresh() {
    this.primengTableHelper.isLoading = true;

    this.loadData(null);
  }

  showDynamicFilter() {
    const dialog = this.dialogService.open(DynamicFilterComponent, {
      header: 'Bộ lọc lead',
      width: '60%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      data: { type: DynamicEntityTypeEnum.LEAD },
    });
    dialog.onClose.subscribe((res) => {
      if (res) {
        this.query.payload = res;
        this.loadData(null);
      }
    });
  }

  showInteractionModal(lead) {
    const dialog = this.dialogService.open(LeadInteractionModalComponent, {
      header: 'Lịch sử tương tác',
      width: '60%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      data: { lead: lead }
    });
  }

  showContact(lead){
    this.router.navigate(['contacts/detail', lead['contactId']]);
  }
}
