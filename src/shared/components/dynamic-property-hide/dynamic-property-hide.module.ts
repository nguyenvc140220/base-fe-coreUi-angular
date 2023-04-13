import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@shared/root.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicPropertyHideComponent } from './dynamic-property-hide.component';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';

@NgModule({
  declarations: [DynamicPropertyHideComponent],
  imports: [
    CoreModule,
    CommonModule,
    ReactiveFormsModule,
    DialogButtonModule,
  ],
})
export class DynamicPropertyHideModule { }
