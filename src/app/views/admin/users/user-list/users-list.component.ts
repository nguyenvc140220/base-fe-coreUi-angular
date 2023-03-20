import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ComponentBase } from '@shared/ultils/component-base.component';
import { Paginator } from 'primeng/paginator';
import { BreadcrumbStore } from '@shared/services/breadcrumb.store';
import { UserCreateModalComponent } from '../user-create-modal/user-create-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { UserModel } from '@shared/models/users/user.model';
import { UsersService } from '@shared/services/users/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UserListComponent
  extends ComponentBase<UserModel>
  implements OnInit, OnDestroy
{
  cols: any[];
  searchKey: string = '';
  @ViewChild('paginator') paginator: Paginator;

  constructor(
    injector: Injector,
    private breadcrumbStore: BreadcrumbStore,
    private dialogService: DialogService,
    private usersService: UsersService
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
        { field: 'username', header: 'Tên đăng nhập' },
        { field: 'fullName', header: 'Họ và tên' },
        { field: 'email', header: 'email' },
        { field: 'enable', header: 'Trạng thái' },
        { field: 'roles', header: 'Quyền' },
        { field: 'groups', header: 'Nhóm' },
        { field: 'createdAt', header: 'Ngày tạo' },
        { field: 'action', header: 'Thao tác' },
      ];
    }
    this.loadData(null);
  }

  loadData(event) {
    this.primengTableHelper.isLoading = true;
    this.usersService
      .getUsers(
        true,
        this.paginator?.currentPage() ?? 1,
        this.primengTableHelper.defaultRecordsCountPerPage
      )
      .subscribe((res) => {
        this.primengTableHelper.isLoading = false;
        this.primengTableHelper.records = res.data;
        this.primengTableHelper.totalRecordsCount = res.total ?? 0;
      });
  }

  paginate(event?: Paginator) {
    this.loadData(event);
  }

  createUser() {
    const dialog = this.dialogService.open(UserCreateModalComponent, {
      header: 'Thêm mới người dùng',
      width: '60%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
    });
    dialog.onClose.subscribe((res) => {
      if (res) {
        this.loadData(null);
      }
    });
  }
}
