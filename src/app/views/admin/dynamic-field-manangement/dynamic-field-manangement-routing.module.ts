import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'contact',
    loadChildren: () =>
      import('./contact-field/contact-field.module').then(
        (m) => m.ContactFieldModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynamicFieldManangementRoutingModule {}
