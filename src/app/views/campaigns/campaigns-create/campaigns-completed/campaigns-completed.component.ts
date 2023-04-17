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
  @Input() campaignsGeneralForm: FormGroup;
  @Output() campaignsGeneralFormChange = new EventEmitter<FormGroup>;
  @Input() segmentationForm: FormGroup;
  @Output() segmentationFormChange = new EventEmitter<FormGroup>;
  @Input() definitionId: string;
  @Output() definitionIdChange = new EventEmitter<string>();
  campaignType = CAMPAIGN_TYPE;
  assignedUser: string;

  ngOnInit(): void {
    let nameUser = []
    if (this.campaignsGeneralForm.value['assignedUser']) {
      this.campaignsGeneralForm.value['assignedUser'].map(el => nameUser.push(el.username));
    }
    this.assignedUser = nameUser.toString();
    console.log(this.segmentationForm.value)
  }

  btnEditStep(i: number) {
    this.activeIndexChange.emit(i);
  }
}
