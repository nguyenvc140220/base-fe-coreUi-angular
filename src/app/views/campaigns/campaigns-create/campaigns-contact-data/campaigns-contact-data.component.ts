import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-campaigns-contact-data',
  templateUrl: './campaigns-contact-data.component.html',
  styleUrls: ['./campaigns-contact-data.component.scss']
})
export class CampaignsContactDataComponent {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
  @Input() formGroup: FormGroup;
}
