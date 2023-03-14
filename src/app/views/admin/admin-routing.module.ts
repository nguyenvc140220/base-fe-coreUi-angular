import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersTableComponent } from "./users-table/users-table.component";

const routes: Routes = [
  {
    path: 'users',
    component: UsersTableComponent,
    data: {
      title: $localize`Danh sách người dùng`,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
