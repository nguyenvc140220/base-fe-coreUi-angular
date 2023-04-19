import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@shared/root.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicPropertyEditComponent } from './dynamic-property-edit.component';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';

@NgModule({
  declarations: [DynamicPropertyEditComponent],
  imports: [
    CoreModule,
    CommonModule,
    ReactiveFormsModule,
    DialogButtonModule,
  ],
})
export class DynamicPropertyEditModule { }
