import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DockModule } from 'primeng/dock';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicCreateComponent } from '@shared/components/dynamic-create/dynamic-create.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CoreModule } from '@shared/root.module';

@NgModule({
  declarations: [DynamicCreateComponent],
  imports: [
    CommonModule,
    DialogButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    DockModule,
    CalendarModule,
    CheckboxModule,
    RadioButtonModule,
    CoreModule,
  ],
})
export class DynamicCreateModule {}
