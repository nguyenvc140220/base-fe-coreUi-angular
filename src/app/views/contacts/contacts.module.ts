import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenubarModule } from 'primeng/menubar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ChipModule } from 'primeng/chip';
import { TabViewModule } from 'primeng/tabview';
import {
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TabsModule,
} from '@coreui/angular';
import { DestroyService } from '@shared/services';
import { CardModule } from 'primeng/card';
import { IconModule } from '@coreui/icons-angular';
import { ContactsTableComponent } from './contacts-table/contacts-table.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsImportComponent } from './contacts-import/contacts-import.component';
import { StepsModule } from 'primeng/steps';
import { ContactsAddFileImportComponent } from './contacts-import/contacts-add-file-import/contacts-add-file-import.component';
import { ContactsMappingFileImportComponent } from './contacts-import/contacts-mapping-file-import/contacts-mapping-file-import.component';
import { ContactsResultFileImportComponent } from './contacts-import/contacts-result-file-import/contacts-result-file-import.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ContactCreateModalComponent } from './contact-create-modal/contact-create-modal.component';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { CustomTableModule } from '@shared/components/custom-table/custom-table.module';
import { DynamicFilterModule } from '@shared/components/dynamic-filter/dynamic-filter.module';
import { DynamicCreateModule } from '@shared/components/dynamic-create/dynamic-create.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CoreModule } from '@shared/root.module';
import { NgxEchartsModule } from 'ngx-echarts';

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
];

@NgModule({
  declarations: [
    ContactsTableComponent,
    ContactsImportComponent,
    ContactsAddFileImportComponent,
    ContactsMappingFileImportComponent,
    ContactsResultFileImportComponent,
    ContactCreateModalComponent,
    ContactDetailComponent,
  ],
  imports: [
    FormsModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    FormModule,
    CardModule,
    ...PRIMENG,
    CardModule,
    ContactsRoutingModule,
    StepsModule,
    FileUploadModule,
    DialogButtonModule,
    CustomTableModule,
    DynamicFilterModule,
    DynamicCreateModule,
    ToastModule,
    CoreModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [DialogService, DynamicDialogRef, DestroyService, MessageService],
  exports: [],
})
export class ContactsModule {}
