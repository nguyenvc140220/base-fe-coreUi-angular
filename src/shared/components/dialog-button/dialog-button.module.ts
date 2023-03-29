import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogButtonComponent } from './dialog-button.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [DialogButtonComponent],
  imports: [CommonModule, ButtonModule, RippleModule],
  exports: [DialogButtonComponent],
})
export class DialogButtonModule {}
