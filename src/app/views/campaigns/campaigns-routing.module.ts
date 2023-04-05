import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CampaignsTableComponent } from "./campaigns-table/campaigns-table.component";


const routes: Routes = [
  {
    path: '',
    component: CampaignsTableComponent,
    data: {
      title: $localize`Quản lí chiến dịch`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignsRoutingModule {

}
