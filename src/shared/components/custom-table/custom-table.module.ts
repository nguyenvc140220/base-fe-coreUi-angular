import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTableComponent } from './custom-table.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DockModule } from 'primeng/dock';
import { DialogButtonModule } from '@shared/components/dialog-button/dialog-button.module';

@NgModule({
  declarations: [CustomTableComponent],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    DockModule,
    DialogButtonModule,
  ],
  exports: [CustomTableComponent],
})
export class CustomTableModule {}
