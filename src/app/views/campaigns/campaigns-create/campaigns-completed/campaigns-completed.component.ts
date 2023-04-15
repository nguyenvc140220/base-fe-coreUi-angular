import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { CAMPAIGN_TYPE } from "@shared/constant/campaign.const";

@Component({
  selector: 'app-campaigns-completed',
  templateUrl: './campaigns-completed.component.html',
  styleUrls: ['./campaigns-completed.component.scss']
})
export class CampaignsCompletedComponent implements OnInit {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
  @Input() formGroup: FormGroup;
  @Output() formGroupChange = new EventEmitter<FormGroup>;
  @Input() definitionId: string;
  @Output() definitionIdChange = new EventEmitter<string>();

  createCampaignRequest
  createCampaign: any;
  campaignType = CAMPAIGN_TYPE;
  assignedUser: string;

  ngOnInit(): void {
    console.log(this.formGroup.value['campaignType'])
    let nameUser = []
    if (this.formGroup.value['assignedUser']) {
      this.formGroup.value['assignedUser'].map(el => nameUser.push(el.username));
    }
    this.assignedUser = nameUser.toString();
    console.log(this.formGroup.value)
  }

  // initData() {
  //   this.createCampaignRequest.name = this.formGroup.value['campaignName'];
  //   this.createCampaign.campaignType =
  //     this.campaignType.find(el => el.value == this.formGroup.value['campaignType']).value || "";
  //   this.createCampaign.assignedUser = this.formGroup.value['assignedUser'] ??
  // this.formGroup.value['assignedUser'].map(el => { return el.name }) }
}
