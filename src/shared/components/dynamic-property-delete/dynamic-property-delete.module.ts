import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@shared/root.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicPropertyDeleteComponent } from './dynamic-property-delete.component';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';

@NgModule({
  declarations: [DynamicPropertyDeleteComponent],
  imports: [
    CoreModule,
    CommonModule,
    ReactiveFormsModule,
    DialogButtonModule,
  ],
})
export class DynamicPropertyDeleteModule { }
