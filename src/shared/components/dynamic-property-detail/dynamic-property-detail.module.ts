import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicPropertyDetailComponent } from './dynamic-property-detail.component';
import { CoreModule } from '@shared/root.module';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [DynamicPropertyDetailComponent],
  imports: [
    CoreModule,
    CommonModule,
    DialogButtonModule,
    ReactiveFormsModule,
    RadioButtonModule,
    ButtonModule,
  ],
})
export class DynamicPropertyDetailModule { }
