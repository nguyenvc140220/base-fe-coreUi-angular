import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CampaignsTableComponent } from "./campaigns-table/campaigns-table.component";
import { CampaignDetailComponent } from "./campaign-detail/campaign-detail.component";
import { CampaignsCreateComponent } from "./campaigns-create/campaigns-create.component";


const routes: Routes = [
  {
    path: '',
    component: CampaignsTableComponent,
    data: {
      title: $localize`Quản lí chiến dịch`,
    }
  },
  {
    path: 'details',
    component: CampaignDetailComponent,
    data: {
      title: $localize`Chi tiết chiến dịch`,
    }
  },

  {
    path: 'create',
    component: CampaignsCreateComponent,
    data: {
      title: $localize`Thêm mới chiến dịch`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignsRoutingModule {

}
