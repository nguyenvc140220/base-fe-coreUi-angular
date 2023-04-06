import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-campaigns-completed',
  templateUrl: './campaigns-completed.component.html',
  styleUrls: ['./campaigns-completed.component.scss']
})
export class CampaignsCompletedComponent {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter<number>();
}
