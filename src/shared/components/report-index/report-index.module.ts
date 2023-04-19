import { NgModule } from "@angular/core";
import { ReportIndexComponent } from "@shared/components/report-index/report-index.component";
import { CardModule } from "primeng/card";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TooltipModule } from "primeng/tooltip";
import { TextTruncateModule } from "@shared/components/text-truncate/text-truncate.module";

@NgModule({
  declarations: [ReportIndexComponent],
  imports: [
    CardModule,
    FontAwesomeModule,
    TooltipModule,
    TextTruncateModule
  ],
  exports: [ReportIndexComponent],
})
export class ReportIndexModule {

}
