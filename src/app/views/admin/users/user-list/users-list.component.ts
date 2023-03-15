import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ComponentBase } from '@shared/ultils/component-base.component';
import { Paginator } from 'primeng/paginator';
import { BreadcrumbStore } from '@shared/services/breadcrumb.store';
import { UserCreateModalComponent } from '../user-create-modal/user-create-modal.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UserListComponent
  extends ComponentBase<any>
  implements OnInit, OnDestroy
{
  cols: any[];
  searchKey: string = '';

  constructor(
    injector: Injector,
    private breadcrumbStore: BreadcrumbStore,
    private dialogService: DialogService
  ) {
    super(injector);
    breadcrumbStore.items = [{ label: 'Danh sách người dùng' }];
  }

  ngOnInit(): void {
    this.initDataTable();
  }

  ngOnDestroy(): void {}

  private initDataTable() {
    {
      this.cols = [
        { field: 'userName', header: 'Tên đăng nhập' },
        { field: 'fullName', header: 'Họ và tên' },
        { field: 'email', header: 'email' },
        { field: 'status', header: 'Trạng thái' },
        { field: 'role', header: 'Quyền' },
        { field: 'lastModify', header: 'Ngày hoạt động gần nhất' },
        { field: 'action', header: 'Thao tác' },
      ];
    }
    this.loadData(null);
  }

  loadData(event) {
    this.primengTableHelper.isLoading = true;

    this.primengTableHelper.isLoading = false;
    this.primengTableHelper.records = [
      {
        userName: 'nguyenvc',
        fullName: 'nguyen',
        email: 'metech@gmail.com',
        status: '',
        action: '',
      },
      {
        userName: 'tiendc',
        fullName: 'tien',
        email: 'metech@gmail.com',
        status: '',
        action: '',
      },
      {
        userName: 'luongld',
        fullName: 'luong',
        email: 'metech@gmail.com',
        status: '',
        action: '',
      },
    ];
    this.primengTableHelper.totalRecordsCount = 3;
  }

  paginate(event?: Paginator) {}

  createUser() {
    const dialog = this.dialogService.open(UserCreateModalComponent, {
      header: 'Thêm mới người dùng',
      width: '60%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
    });
    dialog.onClose.subscribe((res) => {
      if (res) {
      }
    });
  }
}
