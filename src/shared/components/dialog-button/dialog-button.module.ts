import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogButtonComponent } from './dialog-button.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AutoFocusModule } from "primeng/autofocus";

@NgModule({
  declarations: [DialogButtonComponent],
  imports: [CommonModule, ButtonModule, RippleModule, AutoFocusModule],
  exports: [DialogButtonComponent],
})
export class DialogButtonModule {}
