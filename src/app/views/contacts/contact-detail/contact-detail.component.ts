import { Component } from '@angular/core';
import { BreadcrumbStore } from '@shared/services/breadcrumb.store';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent {
  isLoading = false;
  contactInfos = [];

  extendItems = [
    {
      label: 'Sửa',
      icon: 'pi pi-pencil',
      command: () => {
        console.log('Sửa');
      },
    },
    {
      label: 'Nhân bản',
      icon: 'pi pi-copy',
      command: () => {
        console.log('Nhân bản');
      },
    },
    {
      label: 'Gán',
      icon: 'pi pi-link',
      command: () => {
        console.log('Gán');
      },
    },
  ];
  constructor(private breadcrumbStore: BreadcrumbStore) {
    this.breadcrumbStore.items = [
      { label: 'Danh sách liên hệ', routerLink: ['/contacts'] },
      { label: 'Chi tiết liên hệ' },
    ];
  }
}
