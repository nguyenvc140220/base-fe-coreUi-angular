import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/users-list.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { AdminRoutingModule } from '../admin-routing.module';
import { ChipModule } from 'primeng/chip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCreateModalComponent } from './user-create-modal/user-create-modal.component';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';
import { ContactsModule } from '../../contacts/contacts.module';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';
import { CoreModule } from '@shared/root.module';

const PRIMENG = [
  TableModule,
  PaginatorModule,
  ButtonModule,
  InputSwitchModule,
  DividerModule,
  InputTextModule,
  FileUploadModule,
  CalendarModule,
  KeyFilterModule,
  ConfirmDialogModule,
  MultiSelectModule,
  SliderModule,
  AdminRoutingModule,
  ChipModule,
];

@NgModule({
  declarations: [
    UserListComponent,
    UserCreateModalComponent,
    UserEditModalComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UsersRoutingModule,
    ...PRIMENG,
    DialogButtonModule,
    SplitButtonModule,
    SpeedDialModule,
    OverlayPanelModule,
    MenuModule,
    CoreModule,
  ],
})
export class UsersModule {}
