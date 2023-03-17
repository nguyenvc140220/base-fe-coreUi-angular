import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '@coreui/angular';
import { CardModule } from 'primeng/card';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';
import { ContactsModule } from '../contacts/contacts.module';

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
  ],
})
export class ProfileModule {}
