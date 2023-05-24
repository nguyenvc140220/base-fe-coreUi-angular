import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum'
import { ValidatorTypeEnum } from '@shared/enums/validator-type.enum';
import { DynamicInputTypeEnum } from '@shared/enums/dynamic-input-type.enum';
import { DYNAMIC_PROPERTY_TYPE, DynamicTypeEnum } from '@shared/enums/dynamic-data-type.const';

@Component({
  selector: 'app-dynam<p-dropdownic-property-detail',
  templateUrl: './dynamic-property-detail.component.html',
  styleUrls: ['./dynamic-property-detail.component.scss']
})

export class DynamicPropertyDetailComponent {

  formGroup: FormGroup;
  entity: DynamicPropertyModel;
  DynamicDataTypeEnum = DynamicDataTypeEnum;
  intputTypeMap = new Map<DynamicInputTypeEnum, DynamicTypeEnum>([
    [DynamicInputTypeEnum.TEXT_BOX, DynamicTypeEnum.TEXT],
    [DynamicInputTypeEnum.EMAIL, DynamicTypeEnum.EMAIL],
    [DynamicInputTypeEnum.PHONE_NUMBER, DynamicTypeEnum.PHONE_NUMBER],
    [DynamicInputTypeEnum.NUMBER_BOX, DynamicTypeEnum.NUMBER],
    [DynamicInputTypeEnum.DATE_PICKER, DynamicTypeEnum.DATE],
    [DynamicInputTypeEnum.DATETIME_PICKER, DynamicTypeEnum.DATETIME],
    [DynamicInputTypeEnum.TIME_PICKER, DynamicTypeEnum.TIME],
    [DynamicInputTypeEnum.CHECK_LIST, DynamicTypeEnum.CHECKLIST],
    [DynamicInputTypeEnum.RADIO, DynamicTypeEnum.RADIO],
    [DynamicInputTypeEnum.SINGLE_SELECT, DynamicTypeEnum.RADIO],
    [DynamicInputTypeEnum.MULTI_SELECT, DynamicTypeEnum.DROPLIST],
  ]);
  defaultValues: any;

  constructor(
    public ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig
  ) {
    this.formGroup = new FormGroup({});
  }
  ngOnInit(): void {
    if (this.dynamicDialogConfig.data.entity) {
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
      value: DYNAMIC_PROPERTY_TYPE.find(x => x.value === this.intputTypeMap.get(this.entity.inputType)).label,
      disabled: true,
    }
    ));
    // add isFixed formcontrol, value is entity.isFixed and disabled is true
    this.formGroup.addControl('editable', new FormControl({
      value: this.entity.editable,
      disabled: true,
    }
    ));


    switch (this.entity.dataType) {
      case DynamicDataTypeEnum.DATETIME:
        break;
      case DynamicDataTypeEnum.NUMBER:
        // maxValue is entity.validators.find(x => x.type === ValidatorTypeEnum.LONG_MAX)?.validatorValue or entity.validators.find(x => x.type === ValidatorTypeEnum.DOUBLE_MAX)?.validatorValue
        // minValue is entity.validators.find(x => x.type === ValidatorTypeEnum.LONG_MIN)?.validatorValue or entity.validators.find(x => x.type === ValidatorTypeEnum.DOUBLE_MIN)?.validatorValue
        // add maxValue formcontrol, value is entity.validators.find(x => x.type === ValidatorTypeEnum.LONG_MAX)?.validatorValue or entity.validators.find(x => x.type === ValidatorTypeEnum.DOUBLE_MAX)?.validatorValue and disabled is true
        const maxValue = this.entity.validators.find(x => x.type === ValidatorTypeEnum.LONG_MAX)?.validatorValue
          || this.entity.validators.find(x => x.type === ValidatorTypeEnum.DOUBLE_MAX)?.validatorValue;
        const minValue = this.entity.validators.find(x => x.type === ValidatorTypeEnum.LONG_MIN)?.validatorValue
          || this.entity.validators.find(x => x.type === ValidatorTypeEnum.DOUBLE_MIN)?.validatorValue;
        this.formGroup.addControl('maxValue', new FormControl({
          value: maxValue,
          disabled: true,
        }
        ));
        this.formGroup.addControl('minValue', new FormControl({
          value: minValue,
          disabled: true,
        }
        ));
        this.formGroup.addControl('doublePoint', new FormControl({
          value: this.entity.validators.find(x => x.type === ValidatorTypeEnum.DOUBLE_POINT)?.validatorValue,
          disabled: true,
        }
        ));
        break;
      case DynamicDataTypeEnum.TEXT:
        // add maxLength formcontrol, value is entity.maxLength and disabled is true
        this.formGroup.addControl('maxLength', new FormControl({
          value: this.entity.validators.find(x => x.type === ValidatorTypeEnum.STRING_LENGTH_MAX)?.validatorValue,
          disabled: true,
        }
        ));
        break;
      case DynamicDataTypeEnum.LIST:
        if (this.entity.inputType) {
          const selectSize = this.entity.inputType === DynamicInputTypeEnum.SINGLE_SELECT ? 1 : 2;
          this.formGroup.addControl('selectSize', new FormControl({
            value: selectSize,
            disabled: true,
          }
          ));
        }
        // parse Json string this.entity.defaultValue to object

        this.defaultValues = JSON.parse(this.entity.defaultValue);
        this.defaultValues.forEach((item, index) => {
          const controlName = `option_${index}`;
          this.formGroup.addControl(controlName, new FormControl({
            value: item.value,
            disabled: true,
          }
          ));
        });
        break;
      default:
        console.log('#### default ####');
    }
  }
  close() {
    this.ref.close();
  }
}
