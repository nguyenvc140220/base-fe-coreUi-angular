import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";

@Component({
  selector: 'app-campaign-summary',
  templateUrl: './campaign-summary.component.html',
  styleUrls: ['./campaign-summary.component.scss']
})
export class CampaignSummaryComponent {

  constructor(route: ActivatedRoute, breadcrumbStore: BreadcrumbStore) {
    const {queryParams} = route.snapshot;

    breadcrumbStore.items = [
      {label: 'Quản lý chiến dịch', routerLink: ['/campaigns']},
      {label: `Tổng quan chiến dịch ${queryParams['name']}`},
    ];
  }

  handleRefresh($event: MouseEvent) {

  }
}
