import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-campaigns-general-information',
  templateUrl: './campaigns-general-information.component.html',
  styleUrls: ['./campaigns-general-information.component.scss']
})
export class CampaignsGeneralInformationComponent {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
}
