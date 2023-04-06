import { NgModule } from '@angular/core';
import { DynamicPropertyDetailComponent } from './dynamic-property-detail.component';
import { CoreModule } from '@shared/root.module';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';

@NgModule({
  declarations: [DynamicPropertyDetailComponent],
  imports: [CoreModule, DialogButtonModule],
})
export class DynamicPropertyDetailModule {}
