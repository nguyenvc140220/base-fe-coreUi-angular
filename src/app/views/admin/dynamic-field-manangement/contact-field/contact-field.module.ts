import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactFieldRoutingModule } from './contact-field-routing.module';
import { ContactFieldListsComponent } from './contact-field-lists/contact-field-lists.component';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { DynamicPropertyListModule } from '@shared/components/dynamic-property-list/dynamic-property-list.module';
import { DynamicPropertyCreateModule } from '@shared/components/dynamic-property-create/dynamic-property-create.module';
import { DynamicPropertyDetailModule } from '@shared/components/dynamic-property-detail/dynamic-property-detail.module';
import { DynamicPropertyEditModule } from '@shared/components/dynamic-property-edit/dynamic-property-edit.module';
import { DynamicPropertyDeleteModule } from '@shared/components/dynamic-property-delete/dynamic-property-delete.module';
import { DynamicPropertyHideModule } from '@shared/components/dynamic-property-hide/dynamic-property-hide.module';
import { DynamicPropertyHideComponent } from '@shared/components/dynamic-property-hide/dynamic-property-hide.component';

@NgModule({
  declarations: [ContactFieldListsComponent],
  imports: [
    CommonModule,
    ContactFieldRoutingModule,
    ChipsModule,
    ButtonModule,
    DynamicPropertyListModule,
    DynamicPropertyCreateModule,
    DynamicPropertyDetailModule,
    DynamicPropertyEditModule,
    DynamicPropertyDeleteModule,
    DynamicPropertyHideModule,
  ],
})
export class ContactFieldModule { }
