import { NgModule } from "@angular/core";
import { ReportIndexComponent } from "@shared/components/report-index/report-index.component";
import { CardModule } from "primeng/card";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [ReportIndexComponent],
  imports: [
    CardModule,
    FontAwesomeModule
  ],
  exports: [ReportIndexComponent],
})
export class ReportIndexModule {

}
