import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { DynamicFieldService } from '@shared/services/dynamic-field/dynamic-field.service';
import { DynamicPropertyDeleteModel } from '@shared/models/dynamic-field/dynamic-property-delete.model';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dynamic-property-delete',
  templateUrl: './dynamic-property-delete.component.html',
  styleUrls: ['./dynamic-property-delete.component.scss']
})
export class DynamicPropertyDeleteComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  entity: DynamicPropertyModel;
  messageService: MessageService;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private dynamicFieldService: DynamicFieldService,
  ) {
    this.formGroup = new FormGroup({});
  }
  ngOnDestroy(): void { 
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit(): void {
    this.entity = this.dynamicDialogConfig.data.entity;
    this.messageService = this.dynamicDialogConfig.data.messageService;
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xóa thành công' });
  }
  showError(err: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err ? err : 'Xóa thất bại' });
  }
  onDialogEvent(event: any) {
    switch (event) {
      case 'SAVE_BUTTON':
        this.dynamicFieldService.deleteDynamicProperty(
          new DynamicPropertyDeleteModel({code: this.entity.code}) 
        )
        .pipe(takeUntil(
          this.unsubscribe$
        ))
        .subscribe({
          next: (res) => {
            if (res.data) {
              this.showSuccess();
            } else {
              this.showError(null);
            }
            this.ref.close();
          },
          error: (err) => {
            this.showError(err);
          }
        });    
        break;
      case 'CANCEL_BUTTON':
        this.ref.close();
        break;
    }
  }
}
