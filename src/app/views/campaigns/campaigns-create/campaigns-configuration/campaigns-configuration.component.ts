import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-campaigns-configuration',
  templateUrl: './campaigns-configuration.component.html',
  styleUrls: ['./campaigns-configuration.component.scss']
})
export class CampaignsConfigurationComponent {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
}
