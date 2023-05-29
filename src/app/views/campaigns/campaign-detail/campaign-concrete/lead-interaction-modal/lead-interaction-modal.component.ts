import { Component } from '@angular/core';
import { LeadModel } from "@shared/models/campaign/lead.model";
import { DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
  selector: 'app-lead-interaction-modal',
  templateUrl: './lead-interaction-modal.component.html',
  styleUrls: ['./lead-interaction-modal.component.scss']
})
export class LeadInteractionModalComponent {
  lead:LeadModel;
  constructor(private config: DynamicDialogConfig,) {
    if(config['data']){
      this.lead = config['data']['lead'];
    }
  }
}
