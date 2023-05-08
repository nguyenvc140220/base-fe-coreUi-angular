import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicFieldService } from '@shared/services/dynamic-field/dynamic-field.service';
import { DynamicPropertyUpdateModel } from '@shared/models/dynamic-field/dynamic-property-update.model';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DynamicPropertyModel } from "@shared/models/dynamic-field/dynamic-property.model";
import { DynamicEntityTypeEnum } from "@shared/enums/dynamic-entity-type.enum";

@Component({
  selector: 'app-dynamic-property-edit',
  templateUrl: './dynamic-property-edit.component.html',
  styleUrls: ['./dynamic-property-edit.component.scss']
})
export class DynamicPropertyEditComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  messageService: MessageService;
  private unsubscribe$: Subject<void> = new Subject<void>();
  maxLength: number = 50;
  properties: DynamicPropertyModel[];

  constructor(
    public ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private dynamicFieldService: DynamicFieldService
  ) {
    this.formGroup = new FormGroup({});
  }

  ngOnInit(): void {
    this.formGroup.addControl('displayName', new FormControl({
        value: this.dynamicDialogConfig.data.entity?.displayName,
        disabled: false,
      },
      {
        validators: [Validators.required, this.trimValidator.bind(this)],
      }
    ));
    this.messageService = this.dynamicDialogConfig.data.messageService;
    this.dynamicFieldService.getDynamicProperties({
      page: 1,
      type: DynamicEntityTypeEnum.CONTACT,
      size: 1000,
    })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200 && res.data.content.length > 0)
            return this.properties = res.data.content
        }
      });
  }

  get remainingChars() {
    return this.maxLength - this.formGroup.value.displayName.trim().length;
  }

  trimValidator(control: FormControl): { [key: string]: boolean } | null {
    console.log("debug " + control.value);
    const trimmedValue = control.value?.trim();
    if (!trimmedValue) {
      return {"required": true};
    }
    if (control.value.trim() == this.dynamicDialogConfig.data.entity?.displayName) return null;

    if (this.properties.filter(el => el.displayName.toLowerCase() == trimmedValue.toLowerCase()).length > 0) {
      return {"validatorDisplayNameExist": true};
    }
    return null;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Cập nhật thành công'});
  }

  showError(err: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: err?.error?.msg ? err?.error?.msg : 'Cập nhật thất bại'
    });
  }

  onDialogEvent(event: any) {
    switch (event) {
      case 'SAVE_BUTTON':
        //check if this.form is valid
        if (this.formGroup.valid) {
          const req = new DynamicPropertyUpdateModel({
            code: this.dynamicDialogConfig.data.entity.code,
            displayName: this.formGroup.value.displayName.trim(),
          });
          this.dynamicFieldService.updateDynamicProperty(req)
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
                this.ref.close();
              }
            });
        }
        break;
      case 'CANCEL_BUTTON':
        this.ref.close();
        break;
    }
  }
}
