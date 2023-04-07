import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicPropertyDetailComponent } from './dynamic-property-detail.component';
import { CoreModule } from '@shared/root.module';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DynamicPropertyDetailComponent],
  imports: [
    CoreModule,
    CommonModule,
    DialogButtonModule,
    ReactiveFormsModule,
  ],
})
export class DynamicPropertyDetailModule { }
