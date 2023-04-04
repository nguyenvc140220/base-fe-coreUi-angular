import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonEnum } from '@shared/enums/button-status.enum';
import { FormGroup } from '@angular/forms';
import { DynamicEntityTypeEnum } from '@shared/enums/dynamic-entity-type.enum';
import { takeUntil } from 'rxjs';
import { DynamicFieldService } from '@shared/services/dynamic-field/dynamic-field.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { removeNullValue } from '@shared/utils/object.utils';
import { DestroyService } from '@shared/services';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { DynamicFormBuilder } from '@shared/services/dynamic-field/dynamic-form-builder';
import { DynamicModeEnum } from '@shared/enums/dynamic-mode.enum';
import { DynamicEntityModel } from '@shared/models/dynamic-field/dynamic-response.model';

@Component({
  selector: 'app-dynamic-create',
  templateUrl: './dynamic-create.component.html',
  styleUrls: ['./dynamic-create.component.scss'],
})
export class DynamicCreateComponent
  extends DestroyService
  implements OnInit, OnDestroy
{
  form: FormGroup = new FormGroup({});
  properties: DynamicPropertyModel[];
  dynamicType: DynamicEntityTypeEnum;
  dynamicMode: DynamicModeEnum;
  entity: DynamicEntityModel;
  isLoading = false;
  constructor(
    private dynamicFieldService: DynamicFieldService,
    private dynamicFormBuilder: DynamicFormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    super();
    this.dynamicType = config.data['type'];
    this.dynamicMode = config.data['mode'] ?? DynamicModeEnum.ADD;
    if (this.dynamicMode == DynamicModeEnum.EDIT) {
      this.entity = config.data['entity'];
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.dynamicFieldService
      .getDynamicProperties({
        page: 1,
        type: this.dynamicType,
        size: 100,
      })
      .pipe(takeUntil(this))
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.statusCode == 200) {
            this.properties = res.data.content;
            this.form = this.dynamicFormBuilder.generateFormGroup(
              this.form,
              this.properties
            );
            if (this.dynamicMode == DynamicModeEnum.EDIT) {
              this.form.patchValue(this.entity);
            }
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        },
      });
  }
  onDialogEvent(button: ButtonEnum) {
    switch (button) {
      case ButtonEnum.SAVE_BUTTON:
        if (this.form.valid) {
          this.isLoading = true;
          if (this.dynamicMode == DynamicModeEnum.EDIT) {
            this.dynamicFieldService
              .updateDynamicEntity({
                code: this.dynamicType,
                idEntity: this.entity.id,
                properties: removeNullValue(this.form.value),
              })
              .subscribe({
                next: (res) => {
                  this.isLoading = false;
                  if (res.statusCode == 200) {
                    this.ref.close(res.data);
                  }
                },
                error: () => {
                  this.isLoading = false;
                },
              });
          } else {
            this.dynamicFieldService
              .createDynamicEntity({
                code: this.dynamicType,
                properties: removeNullValue(this.form.value),
              })
              .subscribe({
                next: (res) => {
                  this.isLoading = false;
                  if (res.statusCode == 200) {
                    this.ref.close(res.data);
                  }
                },
                error: () => {
                  this.isLoading = false;
                },
              });
          }
        }
        break;
      default:
        this.ref.close();
        break;
    }
  }
}
