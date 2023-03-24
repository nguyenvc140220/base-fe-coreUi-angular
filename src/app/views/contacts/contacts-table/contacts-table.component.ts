import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/ultils/component-base.component';
import { Paginator } from 'primeng/paginator';
import { Router } from '@angular/router';
import { BreadcrumbStore } from '@shared/services/breadcrumb.store';
import { DialogService } from 'primeng/dynamicdialog';
import { ContactCreateModalComponent } from '../contact-create-modal/contact-create-modal.component';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss'],
})
export class ContactsTableComponent
  extends ComponentBase<any>
  implements OnInit, OnDestroy {
  cols: any[];
  searchKey: string = '';

  constructor(
    injector: Injector,
    private dialogService: DialogService,
    private router: Router,
    private breadcrumbStore: BreadcrumbStore
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

  private initDataTable() {
    {
      this.cols = [
        {field: 'id', header: 'ID'},
        {field: 'action', header: 'Thao tác'},
        {field: 'phone', header: 'Số điện thoại'},
        {field: 'email', header: 'email'},
        {field: 'fullName', header: 'Họ và tên'},
        {field: 'status', header: 'Trạng thái'},
      ];
    }
    this.loadData(null);
  }

  loadData(event) {
    this.primengTableHelper.isLoading = true;

    this.primengTableHelper.isLoading = false;
    this.primengTableHelper.records = [
      {
        name: 'nguyenvc',
        email: 'metech@gmail.com',
        status: '',
        id: '1',
        action: '',
      },
      {
        name: 'tiendc',
        email: 'metech@gmail.com',
        status: '',
        id: '2',
        action: '',
      },
      {
        name: 'luongld',
        email: 'metech@gmail.com',
        status: '',
        id: '3',
        action: '',
      },
    ];
    this.primengTableHelper.totalRecordsCount = 3;
  }

  paginate(event?: Paginator) {}

  createContact() {
    const dialog = this.dialogService.open(ContactCreateModalComponent, {
      header: 'Thêm mới liên hệ',
      width: '60%',
      contentStyle: {'max-height': '80vh', overflow: 'auto'},
    });
    dialog.onClose.subscribe((res) => {
      if (res) {
      }
    });
  }
}
