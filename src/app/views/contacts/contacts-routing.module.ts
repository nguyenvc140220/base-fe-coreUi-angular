import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsTableComponent } from './contacts-table/contacts-table.component';
import { ContactsImportComponent } from "./contacts-import/contacts-import.component";

const routes: Routes = [
  {
    path: '',
    component: ContactsTableComponent,
    data: {
      title: $localize`Danh sách người liên hệ`,
    }
  },
  {
    path: 'importing',
    component: ContactsImportComponent,
    data: {
      title: $localize`Import liên hệ`,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {}
