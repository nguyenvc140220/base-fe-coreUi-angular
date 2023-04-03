import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFieldListsComponent } from './contact-field-lists/contact-field-lists.component';

const routes: Routes = [
  {
    path: 'fields',
    component: ContactFieldListsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactFieldRoutingModule {}
