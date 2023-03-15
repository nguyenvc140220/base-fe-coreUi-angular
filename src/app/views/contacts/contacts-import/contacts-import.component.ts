import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbStore } from '@shared/services/breadcrumb.store';

@Component({
  selector: 'app-contacts-import',
  templateUrl: './contacts-import.component.html',
  styleUrls: ['./contacts-import.component.scss'],
})
export class ContactsImportComponent implements OnInit {
  activeIndex = 0;
  steps: MenuItem[];

  constructor(private breadcrumbStore: BreadcrumbStore) {
    this.breadcrumbStore.items = [
      {
        label: 'Danh sách liên hệ',
        routerLink: '/contacts',
      },
      {
        label: 'Import liên hệ',
      },
    ];
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
