import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ComponentBase } from '@shared/utils/component-base.component';
import { Paginator } from 'primeng/paginator';
import { BreadcrumbStore } from '@shared/services/breadcrumb.store';
import { UserCreateModalComponent } from '../user-create-modal/user-create-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { UserModel } from '@shared/models/users/user.model';
import { UsersService } from '@shared/services/users/users.service';
import { MenuItem } from 'primeng/api';
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';
import { DynamicQueryModel } from "@shared/models/dynamic-field/dynamic-query.model";
import { DynamicDataTypeEnum } from "@shared/enums/dynamic-data-type.enum";
import { DynamicFilterOperatorEnum } from "@shared/enums/dynamic-filter-operator.enum";
import { DynamicFilterTypeEnum } from "@shared/enums/dynamic-filter-type.enum";

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UserListComponent
  extends ComponentBase<any>
  implements OnInit, OnDestroy {
  searchKey: string = '';
  @ViewChild('paginator') paginator: Paginator;
  items: MenuItem[];
  query: DynamicQueryModel = {
    payload: {},
  };
  colSearch = [
    {field: 'username', header: 'Tên đăng nhập'},
    {field: 'email', header: 'Email'},
    {field: 'userFullName', header: 'Họ và tên'}
  ]
  cols = [
    {field: 'username', header: 'Tên đăng nhập'},
    {field: 'email', header: 'Email'},
    {field: 'userFullName', header: 'Họ và tên'},
    {field: 'status', header: 'Trạng thái'},
    {field: 'roles', header: 'Quyền'},
    {field: 'lastActive', header: 'Ngày hoạt động cuối'},
    {field: 'action', header: 'Thao tác'}
  ]

  constructor(
    injector: Injector,
    private breadcrumbStore: BreadcrumbStore,
    private dialogService: DialogService,
    private usersService: UsersService
  ) {
    super(injector);
    breadcrumbStore.items = [{label: 'Danh sách người dùng'}];
    this.primengTableHelper.defaultRecordsCountPerPage = 100;
  }

  ngOnInit(): void {
    this.initDataTable();
  }

  ngOnDestroy(): void {}

  private initDataTable() {
    this.loadData(null);
  }

  loadData(event) {
    this.query.currentPage = this.primengTableHelper.getCurrentPage(
      this.paginator
    );
    this.query.pageSize = this.primengTableHelper.getMaxResultCount(
      this.paginator,
      event
    );
    this.primengTableHelper.isLoading = true;
    this.usersService
      .getUsers(
        this.query
      )
      .subscribe((res) => {
        this.primengTableHelper.isLoading = false;
        this.primengTableHelper.records = res.data.content;
        this.primengTableHelper.totalRecordsCount = res.data.totalElements;
      });
  }

  paginate(event?: Paginator) {
    this.loadData(event);
  }

  createUser() {
    const dialog = this.dialogService.open(UserCreateModalComponent, {
      header: 'Thêm mới người dùng',
      width: '60%',
      contentStyle: {'max-height': '80vh', overflow: 'auto'},
    });
    dialog.onClose.subscribe((res) => {
      if (res) {
        this.loadData(null);
      }
    });
  }

  editUser(userId: string) {
    const dialog = this.dialogService.open(UserEditModalComponent, {
      header: 'Chỉnh sửa người dùng',
      width: '60%',
      contentStyle: {'max-height': '80vh', overflow: 'auto'},
      data: {
        userId: userId,
      },
    });
    dialog.onClose.subscribe((res) => {
      if (res) {
        this.loadData(null);
      }
    });
  }

  searchData() {
    if (this.searchKey && this.searchKey.trim() != '') {
      var payload = this.colSearch.map((c) => {
        return {
          field: c.field,
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
}
