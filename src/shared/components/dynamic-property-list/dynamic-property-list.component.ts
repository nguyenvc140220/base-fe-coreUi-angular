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
import { DYNAMIC_DATA_TYPE } from '@shared/enums/dynamic-data-type.const';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';

@Component({
  selector: 'app-dynamic-property-list',
  templateUrl: './dynamic-property-list.component.html',
  styleUrls: ['./dynamic-property-list.component.scss'],
})
export class DynamicPropertyListComponent
  extends ComponentBase<DynamicPropertyModel>
  implements OnInit, OnDestroy
{
  @Input() dynamicType = DynamicEntityTypeEnum.CONTACT;
  cols = [
    { field: 'id', title: 'Hành động' },
    { field: 'displayName', title: 'Tên trường dữ liệu' },
    { field: 'entityType', title: 'Kiểu dữ liệu' },
    { field: 'editable', title: 'Trạng thái' },
    { field: 'creationTime', title: 'Ngày tạo' },
    { field: 'updatedTime', title: 'Ngày cập nhật gần nhất' },
  ];
  @ViewChild('paginator') paginator: Paginator;
  constructor(
    injector: Injector,
    private dynamicFieldService: DynamicFieldService,
    private destroyService: DestroyService
  ) {
    super(injector);
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.loadData(null);
  }

  loadData(event) {
    this.primengTableHelper.isLoading = true;
    this.dynamicFieldService
      .getDynamicProperties({
        page: this.primengTableHelper.getCurrentPage(this.paginator),
        type: this.dynamicType,
        size: this.primengTableHelper.getMaxResultCount(this.paginator, event),
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

  getPropertyType(entity) {
    return (
      DYNAMIC_DATA_TYPE.find(
        (d) =>
          d.value.dataType == entity.dataType &&
          d.value.inputType == entity.inputType
      )?.label ?? '-'
    );
  }
  paginate(event: any) {
    this.loadData(event);
  }
}
