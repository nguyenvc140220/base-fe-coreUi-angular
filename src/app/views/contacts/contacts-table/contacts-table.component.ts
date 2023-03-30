import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ComponentBase } from '@shared/utils/component-base.component';
import { Paginator } from 'primeng/paginator';
import { Router } from '@angular/router';
import { BreadcrumbStore } from '@shared/services/breadcrumb.store';
import { DialogService } from 'primeng/dynamicdialog';
import { ContactService } from '@shared/services/contacts/contact.service';
import { DynamicQueryModel } from '@shared/models/dynamic-field/dynamic-query.model';
import { CustomTableComponent } from '@shared/components/custom-table/custom-table.component';
import { DynamicEntityTypeEnum } from '@shared/enums/dynamic-entity-type.enum';
import { DynamicFilterComponent } from '@shared/components/dynamic-filter/dynamic-filter.component';
import { DynamicCreateComponent } from '@shared/components/dynamic-create/dynamic-create.component';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { MessageService } from 'primeng/api';
import { DynamicFilterTypeEnum } from '@shared/enums/dynamic-filter-type.enum';
import { DynamicFilterOperatorEnum } from '@shared/enums/dynamic-filter-operator.enum';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss'],
})
export class ContactsTableComponent
  extends ComponentBase<any>
  implements OnInit, OnDestroy
{
  cols: DynamicPropertyModel[] = [];
  checkedCols: DynamicPropertyModel[] = [];
  searchKey: string = '';

  query: DynamicQueryModel = {
    payload: {},
  };
  @ViewChild('paginator') paginator: Paginator;
  constructor(
    injector: Injector,
    private dialogService: DialogService,
    private router: Router,
    private breadcrumbStore: BreadcrumbStore,
    private contactService: ContactService,

    private messageService: MessageService
  ) {
    super(injector);
    this.breadcrumbStore.items = [{ label: 'Danh sách liên hệ' }];
  }

  ngOnInit(): void {
    this.initDataTable();
  }

  ngOnDestroy(): void {}

  routeContactImport() {
    this.router.navigate(['contacts/importing']);
  }

  private initDataTable() {
    this.contactService
      .getContactProperties({ page: 1, size: 100 })
      .subscribe((res) => {
        if (res.statusCode == 200) {
          const customTable = JSON.parse(
            sessionStorage.getItem('contactCustomTable')
          );
          this.cols = [
            { code: 'action', displayName: 'Thao tác', isDisplay: true },
          ];
          this.cols.push(
            ...res.data.content.map((p, index) => {
              return {
                code: p.code,
                displayName: p.displayName,
                isDisplay:
                  customTable && customTable[p.code] != null
                    ? customTable[p.code].isDisplay
                    : true,
                order:
                  customTable && customTable[p.code] != null
                    ? customTable[p.code].order
                    : index,
              } as DynamicPropertyModel;
            })
          );
          this.cols = this.cols.sort((a, b) => a.order - b.order);
          this.checkedCols = this.cols
            .filter((c) => c.isDisplay)
            .sort((a, b) => a.order - b.order);
        }
      });

    this.loadData(null);
  }
  searchData() {
    if (this.searchKey && this.searchKey.trim() != '') {
      var payload = this.checkedCols.slice(1).map((c) => {
        return {
          field: c.code,
          operator: DynamicFilterOperatorEnum.CONTAIN,
          value: this.searchKey.trim(),
        };
      });
      this.query.payload = {
        type: DynamicFilterTypeEnum.OR,
        payload: payload,
      };
    } else this.query.payload = {};
    this.loadData(null);
  }
  loadData(event) {
    this.primengTableHelper.isLoading = true;
    this.query.currentPage = this.primengTableHelper.getCurrentPage(
      this.paginator
    );
    this.query.pageSize = this.primengTableHelper.getMaxResultCount(
      this.paginator,
      event
    );
    this.contactService.getContacts(this.query).subscribe((res) => {
      this.primengTableHelper.isLoading = false;
      if (res.statusCode == 200) {
        this.primengTableHelper.records = res.data.content;
        this.primengTableHelper.totalRecordsCount = res.data.totalElements;
      }
    });
  }

  paginate(event?: Paginator) {
    this.loadData(event);
  }

  createContact() {
    const dialog = this.dialogService.open(DynamicCreateComponent, {
      header: 'Thêm mới liên hệ',
      width: '60%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      data: { type: DynamicEntityTypeEnum.CONTACT },
    });
    dialog.onClose.subscribe((res) => {
      if (res) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Tạo ${DynamicEntityTypeEnum.CONTACT} thành công`,
        });
        // this.router.navigate(['contacts/detail', res]);
        this.loadData(null);
      }
    });
  }

  showCustomTable() {
    const dialog = this.dialogService.open(CustomTableComponent, {
      header: 'Tùy chỉnh bảng',
      width: '60%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      data: {
        type: DynamicEntityTypeEnum.CONTACT,
        columns: this.cols.length > 0 ? this.cols.slice(1) : undefined,
      },
    });
    dialog.onClose.subscribe((res) => {
      if (res) {
        sessionStorage.setItem(
          'contactCustomTable',
          JSON.stringify(
            res.reduce((x, obj) => {
              return {
                ...x,
                [obj.code]: {
                  isDisplay: obj.isDisplay,
                  order: obj.order,
                },
              };
            }, {})
          )
        );
        this.cols = [
          { code: 'action', displayName: 'Thao tác', isDisplay: true },
        ];
        this.cols.push(...res);
        this.checkedCols = this.cols
          .filter((c) => c.isDisplay)
          .sort((a, b) => a.order - b.order);
      }
    });
  }

  showDynamicFilter() {
    const dialog = this.dialogService.open(DynamicFilterComponent, {
      header: 'Bộ lọc',
      width: '60%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
      data: { type: DynamicEntityTypeEnum.CONTACT },
    });
    dialog.onClose.subscribe((res) => {
      if (res) {
        this.query.payload = res;
        this.loadData(null);
      }
    });
  }

  routeContactDetail(contact) {
    this.router.navigate(['contacts/detail', contact['id']]);
  }
}
