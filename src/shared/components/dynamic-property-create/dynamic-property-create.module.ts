import { NgModule } from '@angular/core';
import { DynamicPropertyCreateComponent } from './dynamic-property-create.component';
import { CoreModule } from '@shared/root.module';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';
import { DynamicFormModule } from '@shared/components/dynamic-form/dynamic-form.module';

@NgModule({
  declarations: [DynamicPropertyCreateComponent],
  imports: [CoreModule, DialogButtonModule, DynamicFormModule],
})
export class DynamicPropertyCreateModule {}
