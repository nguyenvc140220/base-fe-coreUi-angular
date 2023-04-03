import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicPropertyCreateComponent } from './dynamic-property-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { DockModule } from 'primeng/dock';
import { CoreModule } from '@shared/root.module';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [DynamicPropertyCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChipsModule,
    DockModule,
    CoreModule,
    DialogButtonModule,
    CalendarModule,
    RadioButtonModule,
  ],
})
export class DynamicPropertyCreateModule {}
