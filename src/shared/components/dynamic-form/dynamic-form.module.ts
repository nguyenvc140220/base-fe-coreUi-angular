import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DockModule } from 'primeng/dock';
import { ChipsModule } from 'primeng/chips';
import { PaginatorModule } from 'primeng/paginator';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextareaModule,
    DockModule,
    ChipsModule,
    PaginatorModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    MultiSelectModule,
  ],
  exports: [DynamicFormComponent],
})
export class DynamicFormModule {}
