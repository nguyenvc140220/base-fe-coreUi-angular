import { Component, Injector, OnDestroy, OnInit, ViewChild, } from '@angular/core';
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
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { DynamicFilterTypeEnum } from '@shared/enums/dynamic-filter-type.enum';
import { DynamicFilterOperatorEnum } from '@shared/enums/dynamic-filter-operator.enum';
import { DynamicModeEnum } from '@shared/enums/dynamic-mode.enum';
import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum';
import { MessageService } from 'primeng/api';
import { DEFAULT_COL_CONTACT } from "@shared/constant/contacts.const";
import { DynamicInputTypeEnum } from "@shared/enums/dynamic-input-type.enum";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss'],
})
export class ContactsTableComponent
  extends ComponentBase<any>
  implements OnInit, OnDestroy {
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
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {
    super(injector);
    this.breadcrumbStore.items = [{label: 'Danh sách liên hệ'}];
  }

  ngOnInit(): void {
    this.initDataTable();
  }

  ngOnDestroy(): void {}

  routeContactImport() {
    this.router.navigate(['contacts/importing']);
  }

  getDisplayValue(contact, code){
    const property = this.cols.find(p => p.code === code);
    if(property){
      if (contact[code] != null) {
        if (property.dataType === DynamicDataTypeEnum.DATETIME) {
          if(isNaN(contact[code])) return "-";
          const format = property.inputType == DynamicInputTypeEnum.DATE_PICKER ? 'dd/MM/yyyy' : (
            property.inputType == DynamicInputTypeEnum.TIME_PICKER ? 'HH:mm:ss' : 'dd/MM/yyyy HH:mm:ss'
          )
          return this.datePipe.transform(contact[code], format)
        }
      }
    }
    return contact[code] ?? "-";
  }

  private async initDataTable() {
    this.contactService
      .getContactProperties({page: 1, size: 100})
      .subscribe((res) => {
        if (res.statusCode == 200) {
          let customTable = JSON.parse(
            sessionStorage.getItem('contactCustomTable')
          );
          if (!customTable)
            customTable = DEFAULT_COL_CONTACT
          this.cols = [
            new DynamicPropertyModel({
              code: 'action',
              displayName: 'Thao tác',
              isDisplay: true,
              isFixed: true,
            }),
            new DynamicPropertyModel({
              code: 'id',
              displayName: 'ID',
              isDisplay: true,
              isFixed: true,
            }),
            {
              code: 'creationTime',
              displayName: 'Ngày tạo',
              dataType: DynamicDataTypeEnum.DATETIME,
              inputType: DynamicInputTypeEnum.DATE_PICKER,
              isDisplay: true,
              order: 13
            },
            {
              code: 'lastModificationTime',
              displayName: 'Ngày cập nhật gần nhất',
              dataType: DynamicDataTypeEnum.DATETIME,
              inputType: DynamicInputTypeEnum.DATE_PICKER,
              isDisplay: true,
              order: 14
            }

          ];
          this.cols.push(
            ...res.data.content
            .filter((p) => p.visible != null ? p.visible : true)
            .map((p, index) => {
              return {
                code: p.code,
                displayName: p.displayName,
                dataType: p.dataType,
                inputType: p.inputType,
                creationTime: p.creationTime,
                isDisplay:
                  customTable && customTable[p.code] != null
                    ? customTable[p.code].isDisplay
                    : true,
                order:
                  customTable && customTable[p.code] != null
                    ? customTable[p.code].order
                    : p.creationTime,
              } as DynamicPropertyModel;
            })
          );

          this.cols = this.cols.sort((a, b) => a.order - b.order);
          this.checkedCols = this.cols
            .filter((c) => c.isDisplay)
            .sort((a, b) => a.order - b.order);
          if (sessionStorage.getItem('contactDynamicFormValue')) {
            this.query.payload = this.getQuery((JSON.parse(sessionStorage.getItem('contactDynamicFormValue'))));
            this.loadData(null);
          }
        }
      });

    this.loadData(null);
  }

  searchData() {
    if (this.searchKey && this.searchKey.trim() != '') {
      var payload = this.checkedCols
        .slice(1)
        .filter((c) => c.dataType != DynamicDataTypeEnum.DATETIME)
        .map((c) => {
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
      this.paginator.changePage(1);
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
    this.router.navigate([
      'contacts/create',
      {
        type: DynamicEntityTypeEnum.CONTACT,
        mode: DynamicModeEnum.ADD,
      },
    ]);
  }

  editContact(contact) {
    this.router.navigate(
      [
        'contacts/edit',
        {
          type: DynamicEntityTypeEnum.CONTACT,
          mode: DynamicModeEnum.EDIT,
        },
      ],
      {state: {entity: contact}}
    );
  }

  showCustomTable() {
    const dialog = this.dialogService.open(CustomTableComponent, {
      header: 'Tùy chỉnh bảng',
      width: '60%',
      maximizable: true,
      contentStyle: {overflow: 'auto'},
      data: {
        type: DynamicEntityTypeEnum.CONTACT,
        columns: this.cols.length > 0 ? JSON.stringify(this.cols) : undefined, //send a copy to not relate to primary
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
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: `Lưu thành công`,
        });
        this.cols = res;
        this.checkedCols = this.cols
          .filter((c) => c.isDisplay)
          .sort((a, b) => a.order - b.order);
      }
    });
  }

  showDynamicFilter() {
    const dialog = this.dialogService.open(DynamicFilterComponent, {
      header: 'Bộ lọc liên hệ',
      width: '60%',
      contentStyle: {'max-height': '80vh', overflow: 'auto'},
      data: {type: DynamicEntityTypeEnum.CONTACT},
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

  getQuery(entities) {
    var payload = [];
    this.cols.forEach((e) => {
      if (e.isDisplay && entities[e.code] && (Array.isArray( entities[e.code]) || entities[e.code].trim() != '')) {
        payload.push({
          field: e.code,
          operator: entities[e.code + '-operator'],
          value: Array.isArray( entities[e.code]) ? entities[e.code] : entities[e.code].trim(),
        });
      }
    });
    if (payload.length > 0)
      return {
        type: DynamicFilterTypeEnum.AND,
        payload: payload,
      };
    return {};
  }
}
