import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogButtonComponent } from './dialog-button.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [DialogButtonComponent],
  imports: [CommonModule, ButtonModule],
  exports: [DialogButtonComponent],
})
export class DialogButtonModule {}
