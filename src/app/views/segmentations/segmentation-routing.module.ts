import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SegmentationsTableComponent } from "./segmentations-table/segmentations-table.component";

const routes: Routes = [
  {
    path: '',
    component: SegmentationsTableComponent,
    data: {
      title: $localize`Phân khúc khách hàng`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegmentationRoutingModule {

}
