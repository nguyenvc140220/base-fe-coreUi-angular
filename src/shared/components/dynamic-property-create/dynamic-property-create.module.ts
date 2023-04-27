import { NgModule } from '@angular/core';
import { DynamicPropertyCreateComponent } from './dynamic-property-create.component';
import { CoreModule } from '@shared/root.module';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';
import { DynamicFormModule } from '@shared/components/dynamic-form/dynamic-form.module';
import { CheckboxModule } from "primeng/checkbox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ChipsModule } from "primeng/chips";
import { DockModule } from "primeng/dock";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";

@NgModule({
  declarations: [DynamicPropertyCreateComponent],
  imports: [CoreModule, CommonModule, DialogButtonModule, DynamicFormModule, CheckboxModule, FormsModule, ChipsModule, DockModule, ButtonModule, RippleModule, ReactiveFormsModule],
})
export class DynamicPropertyCreateModule {}
