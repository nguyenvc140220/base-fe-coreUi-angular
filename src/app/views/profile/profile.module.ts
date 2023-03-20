import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, FormModule, TableModule } from '@coreui/angular';
import { CardModule } from 'primeng/card';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';
import { ContactsModule } from '../contacts/contacts.module';
import { CalendarModule } from 'primeng/calendar';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabViewModule } from 'primeng/tabview';
import { PasswordModule } from 'primeng/password';

const PRIMENG = [
  TableModule,
  PaginatorModule,
  ButtonModule,
  InputSwitchModule,
  DividerModule,
  InputTextModule,
  CalendarModule,
  KeyFilterModule,
  MultiSelectModule,
  MenubarModule,
  ProgressSpinnerModule,
  SplitButtonModule,
  ChipModule,
  TabViewModule,
  PasswordModule
];
@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    FormModule,
    ReactiveFormsModule,
    CardModule,
    DialogButtonModule,
    ContactsModule,
    ...PRIMENG,
  ],
})
export class ProfileModule {}
