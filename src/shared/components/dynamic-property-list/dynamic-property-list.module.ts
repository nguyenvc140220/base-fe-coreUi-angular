import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicPropertyListComponent } from './dynamic-property-list.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DestroyService } from '@shared/services';
import { DockModule } from 'primeng/dock';
import { ChipModule } from 'primeng/chip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [DynamicPropertyListComponent],
  exports: [DynamicPropertyListComponent],
  imports: [CommonModule, TableModule, PaginatorModule, DockModule, ChipModule, ToastModule],
  providers: [DestroyService, MessageService],
})
export class DynamicPropertyListModule {}
