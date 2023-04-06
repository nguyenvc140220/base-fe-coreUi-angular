// import {
//   faUsers,
//   faChartLine,
//   faChartPie,
//   faMoneyBillWave, faGauge, faPercent
// } from '@fortawesome/free-solid-svg-icons';

import * as faIcons from '@fortawesome/free-solid-svg-icons';
import { Component, Input } from "@angular/core";
import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-report-index',
  templateUrl: './report-index.component.html'
})
export class ReportIndexComponent {

  @Input('icon') private readonly _iconName: string;
  @Input('iconSize') private readonly _iconSize: SizeProp;
  @Input('reportIndex') private readonly _reportIndex: string;
  @Input('label') private readonly _label: string;

  get icon(): IconDefinition {
    return faIcons[this._iconName];
  }

  get size(): SizeProp {
    return this._iconSize || '2xl';
  }

  get reportIndex(): string {
    return this._reportIndex;
  }

  get label(): string {
    return this._label;
  }
}
