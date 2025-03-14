import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';
import { DynamicCreateComponent } from '@shared/components/dynamic-create/dynamic-create.component';
import { CoreModule } from '@shared/root.module';
import { DynamicFormModule } from '@shared/components/dynamic-form/dynamic-form.module';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from "primeng/toast";
import { ScrollPanelModule } from "primeng/scrollpanel";

@NgModule({
  declarations: [DynamicCreateComponent],
  imports: [
    CommonModule,
    DialogButtonModule,
    CoreModule,
    DynamicFormModule,
    DividerModule,
    ToastModule,
    ScrollPanelModule,
  ],
})
export class DynamicCreateModule {}
