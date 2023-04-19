import { NgModule } from "@angular/core";
import { ReportIndexComponent } from "@shared/components/report-index/report-index.component";
import { CardModule } from "primeng/card";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TooltipModule } from "primeng/tooltip";

@NgModule({
  declarations: [ReportIndexComponent],
  imports: [
    CardModule,
    FontAwesomeModule,
    TooltipModule
  ],
  exports: [ReportIndexComponent],
})
export class ReportIndexModule {

}
