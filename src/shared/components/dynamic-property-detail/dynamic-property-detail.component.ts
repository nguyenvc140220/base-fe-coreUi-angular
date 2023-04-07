import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum'
import { DYNAMIC_DATA_TYPE } from '@shared/enums/dynamic-data-type.const';
import { ValidatorTypeEnum } from '@shared/enums/validator-type.enum';

@Component({
  selector: 'app-dynam<p-dropdownic-property-detail',
  templateUrl: './dynamic-property-detail.component.html',
  styleUrls: ['./dynamic-property-detail.component.scss']
})

export class DynamicPropertyDetailComponent {
  formGroup: FormGroup;
  entity: DynamicPropertyModel;
  DynamicDataTypeEnum = DynamicDataTypeEnum;
  constructor(
    public ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig
  ) {
    this.formGroup = new FormGroup({});
  }
  ngOnInit(): void {
    if (this.dynamicDialogConfig.data.entity) {
      console.log('#### form data ####');
      console.log(this.dynamicDialogConfig.data.entity);
      this.entity = this.dynamicDialogConfig.data.entity;
      this.generateForm();
    }
  }
  generateForm() {

    this.formGroup.addControl('displayName', new FormControl({
      value: this.entity.displayName,
      disabled: true,
    }
    ));
    // add tooltip formcontrol, value is entity.tooltip and disabled is true
    this.formGroup.addControl('tooltip', new FormControl({
      value: this.entity.tooltip,
      disabled: true,
    }
    ));
    // add hintText formcontrol, value is entity.palceHolder and disabled is true
    this.formGroup.addControl('hintText', new FormControl({
      value: this.entity.hintText,
      disabled: true,
    }
    ));
    // add dataType formcontrol, value is entity.dataType and disabled is true
    this.formGroup.addControl('dataInputType', new FormControl({
      value: DYNAMIC_DATA_TYPE.find(x => x.value.inputType === this.entity.inputType).label,
      disabled: true,
    }
    ));
    // add isFixed formcontrol, value is entity.isFixed and disabled is true
    this.formGroup.addControl('isFixed', new FormControl({
      value: !this.entity.isFixed,
      disabled: true,
    }
    ));
    

    switch (this.entity.dataType) {
      case DynamicDataTypeEnum.DATETIME:
        console.log('#### datetime ####');
        break;
      case DynamicDataTypeEnum.NUMBER:
        this.formGroup.addControl('maxValue', new FormControl({
          value: this.entity.validators.find(x => x.type === ValidatorTypeEnum.LONG_MAX)?.validatorValue,
          disabled: true,
        }
        ));
        this.formGroup.addControl('minValue', new FormControl({
          value: this.entity.validators.find(x => x.type === ValidatorTypeEnum.LONG_MIN)?.validatorValue,
          disabled: true,
        }
        ));
        break;
      case DynamicDataTypeEnum.TEXT:
        console.log('#### text ####');
        // add maxLength formcontrol, value is entity.maxLength and disabled is true
        this.formGroup.addControl('maxLength', new FormControl({
          value: this.entity.validators.find(x => x.type === ValidatorTypeEnum.STRING_LENGTH_MAX)?.validatorValue,
          disabled: true,
        }
        ));
        break;
      case DynamicDataTypeEnum.LIST:
        console.log('#### list ####');
        break;
      default:
        console.log('#### default ####');
    }
  }
}
