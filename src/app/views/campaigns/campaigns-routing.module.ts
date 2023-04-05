import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";


const routes: Routes = [
  // {
  //   path: '',
  //   component: ,
  //   data: {
  //     title: $localize`Quản lí chiến dịch`,
  //   },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignsRoutingModule {

}
