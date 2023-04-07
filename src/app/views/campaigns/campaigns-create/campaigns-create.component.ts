import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from "primeng/api";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";

@Component({
  selector: 'app-campaigns-create',
  templateUrl: './campaigns-create.component.html',
  styleUrls: ['./campaigns-create.component.scss']
})
export class CampaignsCreateComponent implements OnInit {
  items: MenuItem[];
  activeIndex = 0


  constructor(
    private breadcrumbStore: BreadcrumbStore
  ) {
    breadcrumbStore.items = [{
      label: 'Chiến dịch',
      routerLink: '/campaigns',
    }, {
      label: 'Thêm mới chiến dịch',
    }];
  }


  ngOnInit() {
    this.items = [
      {
        label: 'Thông tin chung',
        command: () => {
          console.log("aaaaaaaaaaaa")
        },
      },
      {
        label: 'Data khách hàng',
        command: () => {
          this.activeIndex = 1
        },
      },
      {
        label: 'Cấu hình',
        command: () => {
          console.log("tttttttttt")
        },
      },
      {
        label: 'Hoàn tất',
        command: () => {
          console.log("oooooooo")
        },
      }
    ];
  }
}
