import { Component, EventEmitter } from '@angular/core';
import { BreadcrumbStore } from '@shared/services/breadcrumb.store';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicEntityTypeEnum } from '@shared/enums/dynamic-entity-type.enum';
import { DynamicPropertyCreateComponent } from '@shared/components/dynamic-property-create/dynamic-property-create.component';

@Component({
  selector: 'app-contact-field-lists',
  templateUrl: './contact-field-lists.component.html',
  styleUrls: ['./contact-field-lists.component.scss'],
})
export class ContactFieldListsComponent {
  onReloadList =  new EventEmitter<boolean>();
  dynamicType = DynamicEntityTypeEnum.CONTACT;
  searchKey = '';

  query = '';

  constructor(
    private breadcrumbStore: BreadcrumbStore,
    private dialogService: DialogService
  ) {
    breadcrumbStore.items = [{ label: 'Trường thông tin liên hệ' }];
  }

  createContactProperty() {
    const dialog = this.dialogService.open(DynamicPropertyCreateComponent, {
      header: 'Thêm mới trường liên hệ',
      width: '60%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      data: { type: DynamicEntityTypeEnum.CONTACT },
    });
    dialog.onClose.subscribe((res) => {
      this.onReloadList.emit(res);
    });
  }

  searchData() {
    this.query = this.searchKey;
  }
}
