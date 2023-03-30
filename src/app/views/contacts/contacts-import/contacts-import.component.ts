import { Component, Injector, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbStore } from '@shared/services/breadcrumb.store';
import { DialogService } from "primeng/dynamicdialog";
import { UsersService } from "@shared/services/users/users.service";
import { ComponentBase } from '@shared/utils/component-base.component';

@Component({
  selector: 'app-contacts-import',
  templateUrl: './contacts-import.component.html',
  styleUrls: ['./contacts-import.component.scss'],
})
export class ContactsImportComponent extends ComponentBase<any> implements OnInit, OnDestroy, OnChanges {
  steps: MenuItem[];
  activeIndex = 0
  file: File
  numOfRecords: number

  constructor(
    injector: Injector,
    private breadcrumbStore: BreadcrumbStore
  ) {
    super(injector);
    breadcrumbStore.items = [{
      label: 'Danh sách liên hệ',
      routerLink: '/contacts',
    }, {
      label: 'Import liên hệ',
    }];
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.file)
  }

  ngOnDestroy(): void {
    console.log(this.file)
  }


  ngOnInit(): void {
    this.initSteps();
  }

  private initSteps(): void {
    this.steps = [
      {
        label: 'Bước 1: Thêm file import',
      },
      {
        label: 'Bước 2: Mapping trường thông tin',
      },
      {
        label: 'Bước 3: Hoàn tất',
      },
    ];
  }
}
