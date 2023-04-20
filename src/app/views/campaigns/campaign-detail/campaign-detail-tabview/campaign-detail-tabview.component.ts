import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbStore } from "@shared/services/breadcrumb.store";
import { ActivatedRoute } from "@angular/router";
import { CampaignSummaryComponent } from "../campaign-summary/campaign-summary.component";
import { CampaignConcreteComponent } from "../campaign-concrete/campaign-concrete.component";

@Component({
  selector: 'app-campaign-detail-tabview',
  templateUrl: './campaign-detail-tabview.component.html',
  styleUrls: ['./campaign-detail-tabview.component.scss']
})
export class CampaignDetailTabviewComponent implements OnInit, AfterViewInit {

  readonly indices = new Map<number, string>([[0, 'Tổng quan'], [1, 'Chi tiết']]);
  private readonly queryParams;

  @ViewChild('btnContainer') btnContainer: ElementRef;

  @ViewChild('campaignSummary') campaignSummary: CampaignSummaryComponent;
  @ViewChild('campaignConcrete') campaignConcrete: CampaignConcreteComponent;


  lastRefreshTime = new Date();
  activeIndex = 0;

  constructor(
    route: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef,
    private readonly breadcrumbStore: BreadcrumbStore) {
    this.queryParams = route.snapshot?.queryParams ?? {};
  }

  ngAfterViewInit(): void {
    const container = document.getElementsByClassName('p-tabview-nav-container')[0];
    container.className = `${container.className} flex justify-between items-center`
    container.appendChild(this.btnContainer.nativeElement.children[0]);
  }

  ngOnInit(): void {
    this.updateBreadcrumb(0);
  }

  handleTabChange(index: number) {
    this.updateBreadcrumb(index);
    console.log('updated ', index)
  }

  updateBreadcrumb(idx) {
    this.breadcrumbStore.items = [
      {label: 'Quản lý chiến dịch', routerLink: ['/campaigns']},
      {label: `${this.indices.get(idx)} chiến dịch ${this.queryParams['name']}`}
    ];
  }

  handleRefresh() {
    this.lastRefreshTime = new Date();
  }

  handleFilter() {
    this.campaignConcrete.showDynamicFilter();
  }
}
