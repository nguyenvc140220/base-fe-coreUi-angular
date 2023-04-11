import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactFieldRoutingModule } from './contact-field-routing.module';
import { ContactFieldListsComponent } from './contact-field-lists/contact-field-lists.component';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { DynamicPropertyListModule } from '@shared/components/dynamic-property-list/dynamic-property-list.module';
import { DynamicPropertyCreateModule } from '@shared/components/dynamic-property-create/dynamic-property-create.module';
import { DynamicPropertyDetailModule } from '@shared/components/dynamic-property-detail/dynamic-property-detail.module';

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
  ],
})
export class ContactFieldModule {}
