import { NgModule } from '@angular/core';
import { DynamicPropertyDetailComponent } from './dynamic-property-detail.component';
import { CoreModule } from '@shared/root.module';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DynamicPropertyDetailComponent],
  imports: [
    CoreModule,
    DialogButtonModule,
    ReactiveFormsModule,
  ],
})
export class DynamicPropertyDetailModule { }
