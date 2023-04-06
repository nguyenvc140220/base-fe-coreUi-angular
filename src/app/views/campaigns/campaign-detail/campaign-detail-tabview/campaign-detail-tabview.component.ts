import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignConcreteComponent } from "../campaign-concrete/campaign-concrete.component";
import { CampaignSummaryComponent } from "../campaign-summary/campaign-summary.component";

@Component({
  selector: 'app-campaign-detail-tabview',
  templateUrl: './campaign-detail-tabview.component.html',
  styleUrls: ['./campaign-detail-tabview.component.scss']
})
export class CampaignDetailTabviewComponent implements OnInit {

  @ViewChild('campaignSummaryComponent') private readonly campaignSummaryComponent: CampaignSummaryComponent;
  @ViewChild('campaignConcreteComponent') private readonly campaignConcreteComponent: CampaignConcreteComponent;

  ngOnInit(): void {
    console.log(this.campaignSummaryComponent);
    console.log(this.campaignConcreteComponent);
  }


}
