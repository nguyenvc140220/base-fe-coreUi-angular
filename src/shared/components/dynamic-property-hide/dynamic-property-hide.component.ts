import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { DynamicPropertyUpdateModel } from '@shared/models/dynamic-field/dynamic-property-update.model';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DynamicFieldService } from '@shared/services/dynamic-field/dynamic-field.service';

@Component({
  selector: 'app-dynamic-property-hide',
  templateUrl: './dynamic-property-hide.component.html',
  styleUrls: ['./dynamic-property-hide.component.scss']
})
export class DynamicPropertyHideComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  entity: DynamicPropertyModel;
  messageService: MessageService;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private dynamicFieldService: DynamicFieldService
  ) {
    this.formGroup = new FormGroup({});
  }
  ngOnInit(): void {
    this.entity = this.dynamicDialogConfig.data.entity;
    this.messageService = this.dynamicDialogConfig.data.messageService;
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cập nhật thành công' });
  }
  showError(err: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.error?.msg ? err?.error?.msg : 'Cập nhật thất bại' });
  }

  onDialogEvent(event: any) {
    switch (event) {
      case 'SAVE_BUTTON':
        const req = new DynamicPropertyUpdateModel({
          code: this.entity.code,
          editable: !this.entity.editable,
        });
        this.dynamicFieldService.updateDynamicProperty(req)
          .pipe(takeUntil(
            this.unsubscribe$
          ))
          .subscribe({
            next: (res) => {
              console.log(res);
              if (res.data) {
                this.showSuccess();
              } else {
                this.showError(null);
              }
              this.ref.close();
            },
            error: (err) => {
              this.showError(err);
              this.ref.close();
            },
          });        
        break;
      case 'CANCEL_BUTTON':
        this.ref.close();
        break;
    }
  }
}
