import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFilterComponent } from './dynamic-filter.component';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DockModule } from 'primeng/dock';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [DynamicFilterComponent],
  imports: [
    CommonModule,
    DialogButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    DockModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    RadioButtonModule,
  ],
})
export class DynamicFilterModule {}
