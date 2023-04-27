import {
  Component,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ComponentBase } from '@shared/utils/component-base.component';
import { Paginator } from 'primeng/paginator';
import { DynamicFieldService } from '@shared/services/dynamic-field/dynamic-field.service';
import { DestroyService } from '@shared/services';
import { takeUntil } from 'rxjs';
import { DynamicEntityTypeEnum } from '@shared/enums/dynamic-entity-type.enum';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicPropertyDetailComponent } from '@shared/components/dynamic-property-detail/dynamic-property-detail.component';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { DynamicPropertyEditComponent } from '@shared/components/dynamic-property-edit/dynamic-property-edit.component';
import { DynamicPropertyDeleteComponent } from '@shared/components/dynamic-property-delete/dynamic-property-delete.component';
import { DynamicPropertyHideComponent } from '../dynamic-property-hide/dynamic-property-hide.component';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-dynamic-property-list',
  templateUrl: './dynamic-property-list.component.html',
  styleUrls: ['./dynamic-property-list.component.scss'],
})
export class DynamicPropertyListComponent
  extends ComponentBase<DynamicPropertyModel>
  implements OnInit, OnDestroy {
  @Input() dynamicType = DynamicEntityTypeEnum.CONTACT;

  _query = '';
  @Input()
  public set query(query: string) {
      this._query = query;
      this.loadData(null);
  }
  cols = [
    { field: 'id', title: 'Thao tác' },
    { field: 'displayName', title: 'Tên trường dữ liệu' },
    // { field: 'entityType', title: 'Kiểu dữ liệu' },
    { field: 'visible', title: 'Trạng thái' },
    { field: 'creationTime', title: 'Ngày tạo' },
    { field: 'lastModificationTime', title: 'Ngày cập nhật gần nhất' },
  ];
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('listTable') listTable: Table;
  constructor(
    injector: Injector,
    private dynamicFieldService: DynamicFieldService,
    private destroyService: DestroyService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {
    super(injector);
  }
  ngOnDestroy(): void { }

  ngOnInit(): void {
    // this.loadData(null);
  }

  loadData(event) {
    this.primengTableHelper.isLoading = true;
    this.dynamicFieldService
      .getDynamicProperties({
        page: this.primengTableHelper.getCurrentPage(this.paginator),
        type: this.dynamicType,
        size: this.primengTableHelper.getMaxResultCount(this.paginator, event),
        keyword: this._query
      })
      .pipe(takeUntil(this.destroyService))
      .subscribe({
        next: (res) => {
          this.primengTableHelper.isLoading = false;
          if (res.statusCode == 200) {
            this.primengTableHelper.records = res.data.content;
            this.primengTableHelper.totalRecordsCount = res.data.totalElements;
          }
        },
        error: (err) => {
          this.primengTableHelper.isLoading = false;
          console.log(err);
        },
      });
  }

  // getPropertyType(entity) {
  //   return (
  //     DYNAMIC_DATA_TYPE.find(
  //       (d) =>
  //         d.value.dataType == entity.dataType &&
  //         d.value.inputType == entity.inputType
  //     )?.label ?? '-'
  //   );
  // }
  paginate(event: any) {
    this.loadData(event);
  }
  showDetail(entity) {
    const dialog = this.dialogService.open(DynamicPropertyDetailComponent, {
      header: 'Chi tiết trường thông tin',
      width: '60%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      data: { entity: entity },
    });
    dialog.onClose.subscribe((res) => {
      console.log(entity);
    });
  }
  edit(entity) {
    const dialog = this.dialogService.open(DynamicPropertyEditComponent, {
      header: 'Sửa tên trường thông tin',
      width: '30%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      data: {
        entity: entity,
        messageService: this.messageService
      },
    });
    dialog.onClose.subscribe((res) => {
      this.goFistAndReload();
    });
  }
  private goFistAndReload() {
    this.paginator.changePage(0);
    this.loadData(null);
    this.listTable.scrollTo({
      top: 0,
      left: 0,
    });
  }

  delete(entity) {
    const dialog = this.dialogService.open(DynamicPropertyDeleteComponent, {
      header: 'Xóa trường thông tin',
      width: '30%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      data: {
        entity: entity,
        messageService: this.messageService
      },
    });
    dialog.onClose.subscribe((res) => {
      this.loadData(null);
    });
  }
  hideOrOpen(entity) {
    const header = !entity.visible ? 'Hiển thị trường thông tin' : 'Ẩn trường thông tin';
    const dialog = this.dialogService.open(DynamicPropertyHideComponent, {
      header: header,
      width: '30%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      data: {
        entity: entity,
        messageService: this.messageService
       },
    });
    dialog.onClose.subscribe((res) => {
      this.goFistAndReload();
    });
  }
}
