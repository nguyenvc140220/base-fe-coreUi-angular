import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbStore } from '@shared/services/breadcrumb.store';

@Component({
  selector: 'app-contacts-import',
  templateUrl: './contacts-import.component.html',
  styleUrls: ['./contacts-import.component.scss'],
})
export class ContactsImportComponent implements OnInit, OnDestroy, OnChanges {
  steps: MenuItem[];
  activeIndex = 0
  file: File
  numOfRecords: number

  constructor(
    private breadcrumbStore: BreadcrumbStore
  ) {
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
        label: 'Thêm file import',
      },
      {
        label: 'Mapping trường thông tin',
      },
      {
        label: 'Hoàn tất import',
      },
    ];
  }
}
