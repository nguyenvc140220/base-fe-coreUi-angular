import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicPropertyListComponent } from './dynamic-property-list.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DestroyService } from '@shared/services';

@NgModule({
  declarations: [DynamicPropertyListComponent],
  exports: [DynamicPropertyListComponent],
  imports: [CommonModule, TableModule, PaginatorModule],
  providers: [DestroyService],
})
export class DynamicPropertyListModule {}
