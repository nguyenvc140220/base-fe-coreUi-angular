import { Component} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { faUsers } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss']
})
export class CampaignDetailComponent {

  private id: string;
  private name: string;

  faUsers = faUsers;

  constructor(route: ActivatedRoute, breadcrumbStore: BreadcrumbStore) {
    const {queryParams} = route.snapshot;

    this.id = queryParams['id'];
    this.name = queryParams['name'];

    breadcrumbStore.items = [
      {label: 'Quản lý chiến dịch', routerLink: ['/campaigns']},
      {label: `Tổng quan chiến dịch ${this.name}`},
    ];
  }

  handleRefresh($event: MouseEvent) {

  }
}
