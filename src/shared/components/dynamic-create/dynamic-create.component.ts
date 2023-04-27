import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonEnum } from '@shared/enums/button-status.enum';
import { FormGroup } from '@angular/forms';
import { DynamicEntityTypeEnum } from '@shared/enums/dynamic-entity-type.enum';
import { takeUntil } from 'rxjs';
import { DynamicFieldService } from '@shared/services/dynamic-field/dynamic-field.service';
import { removeNullValue } from '@shared/utils/object.utils';
import { DestroyService } from '@shared/services';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { DynamicFormBuilder } from '@shared/services/dynamic-field/dynamic-form-builder';
import { DynamicModeEnum } from '@shared/enums/dynamic-mode.enum';
import { DynamicEntityModel } from '@shared/models/dynamic-field/dynamic-response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbStore } from '@shared/services/breadcrumb.store';
import { MessageService } from 'primeng/api';
import { DatePipe } from "@angular/common";
import { DynamicDataTypeEnum } from "@shared/enums/dynamic-data-type.enum";
import { DynamicInputTypeEnum } from "@shared/enums/dynamic-input-type.enum";

@Component({
  selector: 'app-dynamic-create',
  templateUrl: './dynamic-create.component.html',
  styleUrls: ['./dynamic-create.component.scss'],
})
export class DynamicCreateComponent
  extends DestroyService
  implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  properties: DynamicPropertyModel[];
  defaultProperties: DynamicPropertyModel[];
  dynamicProperties: DynamicPropertyModel[];
  dynamicType: DynamicEntityTypeEnum;
  dynamicMode: DynamicModeEnum;
  entity: DynamicEntityModel;
  isLoading = false;

  constructor(
    private dynamicFieldService: DynamicFieldService,
    private dynamicFormBuilder: DynamicFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private breadcrumbStore: BreadcrumbStore,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {
    super();
    this.breadcrumbStore.items = [
      {label: 'Danh sách liên hệ', routerLink: ['/contacts']},
    ];
    this.dynamicType = this.activatedRoute.snapshot.paramMap['params']['type'];
    this.dynamicMode = this.activatedRoute.snapshot.paramMap['params']['mode'];
    if (this.dynamicMode == DynamicModeEnum.EDIT) {
      this.entity = this.router.getCurrentNavigation().extras.state['entity'];
      this.breadcrumbStore.items.push(
        {
          label: `${this.entity.id}`,
          routerLink: ['contacts/detail/' + this.entity.id]
        },
        {label: 'Sửa liên hệ'}
      );
    } else this.breadcrumbStore.items.push({label: 'Thêm mới liên hệ'});
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.initForm();
  }

  initForm() {
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
              this.properties.filter(p => p.dataType === DynamicDataTypeEnum.DATETIME).forEach(
                p => {
                  if (this.entity[p.code] != null && !isNaN(this.entity[p.code])){
                    const format = p.inputType == DynamicInputTypeEnum.DATE_PICKER ? 'dd/MM/yyyy' : (
                      p.inputType == DynamicInputTypeEnum.TIME_PICKER ? 'HH:mm:ss' : 'dd/MM/yyyy HH:mm:ss'
                    )
                    this.entity[p.code] = this.datePipe.transform(this.entity[p.code], format)
                  }
                });

              this.properties.filter(p => p.dataType === DynamicDataTypeEnum.LIST &&
                (p.inputType === DynamicInputTypeEnum.MULTI_SELECT || p.inputType === DynamicInputTypeEnum.CHECK_LIST)
              ).forEach(
                p =>{
                  if (this.entity[p.code] != null){
                    this.entity[p.code] = this.entity[p.code].toString().split(",");
                  }
                }
                );
              this.form.patchValue(this.entity);
            }
            this.defaultProperties = this.properties.filter(
              (el) => el.visible && !el.removable
            );
            this.dynamicProperties = this.properties.filter(
              (el) => el.visible && el.removable
            );
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
          this.properties.filter(p => p.dataType === DynamicDataTypeEnum.DATETIME).forEach(
            p => {
              if (this.form.value[p.code] != null)
                this.form.value[p.code] = new Date(this.form.value[p.code]).getTime().toString();
            });
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
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Success',
                      detail: `Chỉnh sửa ${this.dynamicType} thành công`,
                    });
                    return this.router.navigate(['contacts']);
                  }
                },
                error: () => {
                  this.isLoading = false;
                },
              });
          } else {
            this.form.value['creationSource'] = 'Thủ công';
            this.dynamicFieldService
              .createDynamicEntity({
                code: this.dynamicType,
                properties: removeNullValue(this.form.value),
              })
              .subscribe({
                next: (res) => {
                  this.isLoading = false;
                  if (res.statusCode == 200) {
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Success',
                      detail: `Tạo mới ${this.dynamicType} thành công`,
                    });
                    return this.router.navigate(['contacts']);
                  }
                },
                error: () => {
                  this.isLoading = false;
                },
              });
          }
        }
        break;

      case ButtonEnum.CANCEL_BUTTON:
        return this.router.navigate(['contacts']);
        break;
      default:
        break;
    }
  }
}
