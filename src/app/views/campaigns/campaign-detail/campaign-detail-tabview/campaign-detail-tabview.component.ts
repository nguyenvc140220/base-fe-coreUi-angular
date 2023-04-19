import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignConcreteComponent } from "../campaign-concrete/campaign-concrete.component";
import { CampaignSummaryComponent } from "../campaign-summary/campaign-summary.component";
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-campaign-detail-tabview',
  templateUrl: './campaign-detail-tabview.component.html',
  styleUrls: ['./campaign-detail-tabview.component.scss']
})
export class CampaignDetailTabviewComponent implements OnInit {

  readonly indices = new Map<number, string>([[0, 'Tổng quan'], [1, 'Chi tiết']]);

  private readonly breadcrumbItems = [];
  private readonly queryParams;

  constructor(
    route: ActivatedRoute,
    private readonly breadcrumbStore: BreadcrumbStore) {
    this.queryParams = route.snapshot?.queryParams ?? {};
  }

  ngOnInit(): void {
    this.updateBreadcrumb(0);
  }

  handleTabChange(index: number) {
    this.updateBreadcrumb(index);
  }

  updateBreadcrumb(idx) {
    this.breadcrumbStore.items = [
      {label: 'Quản lý chiến dịch', routerLink: ['/campaigns']},
      {label: `${this.indices.get(idx)} chiến dịch ${this.queryParams['name']}`}
    ];
  }
}
