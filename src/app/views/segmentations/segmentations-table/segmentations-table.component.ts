import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { ComponentBase } from "@shared/utils/component-base.component";
import { Paginator } from "primeng/paginator";
import { SegmentationService } from "@shared/services/segmentation/segmentation.service";
import { Subject, takeUntil } from "rxjs";
import { PageResponse } from "@shared/models";
import { SegmentationListModel } from "@shared/models/segmentation/segmentation-list.model";
import { ToasterService } from "@coreui/angular";
import { MessageService } from "primeng/api";
import { DynamicEntityTypeEnum } from "@shared/enums/dynamic-entity-type.enum";

@Component({
  selector: 'app-segmentation-table',
  templateUrl: './segmentations-table.component.html',
  styleUrls: ['./segmentations-table.component.scss']
})
export class SegmentationsTableComponent extends ComponentBase<any> implements OnInit, OnDestroy {

  cols: { field: string; header: string; order?: number; styles?: { maxWidth: string } }[];
  searchKey: string = '';

  private unsubscribe = new Subject();


  @ViewChild('paginator') paginator: Paginator;


  constructor(
    injector: Injector,
    private readonly breadcrumbStore: BreadcrumbStore,
    private readonly messageService: MessageService,
    private readonly segmentationService: SegmentationService) {
    super(injector);
    breadcrumbStore.items = [{label: 'Phân khúc khách hàng'}];
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.initDataTable();
  }

  paginate(event?: Paginator) {
    this.loadData(event);
  }

  loadData(event?: any) {
    this.primengTableHelper.isLoading = true;

    const currentPage = !event ? 1 : this.primengTableHelper.getCurrentPage(this.paginator) ?? 1;
    const pageSize = this.primengTableHelper.getMaxResultCount(this.paginator, event)
      ?? this.primengTableHelper.defaultRecordsCountPerPage;

    this.segmentationService
      .getSegmentations(
        this.searchKey ?? '',
        currentPage,
        pageSize
      )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (res: PageResponse<SegmentationListModel>) => {
          this.primengTableHelper.records = res.data.content;
          this.primengTableHelper.totalRecordsCount = res.data.totalElements ?? 0;
        },
        error: err => {
          this.primengTableHelper.isLoading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Tải danh sách phân khúc khách hàng không thành công. Vui lòng thử lại!`,
          });
          console.error(`Tải danh sách phân khúc khách hàng không thành công: `, err);
        },
        complete: () => {
          this.primengTableHelper.isLoading = false;
        }
      })
  }

  private initDataTable() {
    {
      this.cols = [
        {field: 'name', header: 'Tên phân khúc', styles: {maxWidth: '300px'}},
        {field: 'action', header: 'Thao tác', styles: {maxWidth: '200px'}},
        {field: 'numOfContacts', header: 'Liên hệ thuộc phân khúc', styles: {maxWidth: '50px'}},
        {field: 'creationTime', header: 'Ngày tạo', styles: {maxWidth: '100px'}},
        {field: 'createdBy', header: 'Người tạo', styles: {maxWidth: '100px'}},
        {field: 'lastModificationTime', header: 'Ngày cập nhật gần nhất', styles: {maxWidth: '100px'}},
      ];
    }

    this.loadData();
  }
}
