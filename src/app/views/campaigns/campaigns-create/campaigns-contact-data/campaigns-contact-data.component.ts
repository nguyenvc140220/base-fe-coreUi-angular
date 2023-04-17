import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { CUSTOMER_TYPE } from "@shared/constant/campaign.const";

@Component({
  selector: 'app-campaigns-contact-data',
  templateUrl: './campaigns-contact-data.component.html',
  styleUrls: ['./campaigns-contact-data.component.scss']
})
export class CampaignsContactDataComponent implements OnInit {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
  @Input() definitionId: string;
  @Output() definitionIdChange = new EventEmitter<string>();
  @Input() segmentationForm: FormGroup;
  @Output() segmentationFormChange = new EventEmitter<FormGroup>;
  dataContactTypes = CUSTOMER_TYPE;
  dataContactType: string;

  ngOnInit(): void {
  }

  eventDataContactType(event) {
    this.dataContactType = event.value
  }
}
