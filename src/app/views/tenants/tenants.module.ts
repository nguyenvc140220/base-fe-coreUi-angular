import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// primeng
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
];

@NgModule({
  declarations: [],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ...PRIMENG],
})
export class TenantsModule {}
