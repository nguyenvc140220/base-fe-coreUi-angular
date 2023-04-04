import { Component, OnInit } from '@angular/core';
import { ButtonEnum } from '@shared/enums/button-status.enum';
import { FormGroup } from '@angular/forms';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum';
import { DynamicInputTypeEnum } from '@shared/enums/dynamic-input-type.enum';
import { DYNAMIC_DATA_TYPE } from '@shared/enums/dynamic-data-type.const';
import { DynamicFormBuilder } from '@shared/services/dynamic-field/dynamic-form-builder';
import { ValidatorTypeEnum } from '@shared/enums/validator-type.enum';

@Component({
  selector: 'app-dynamic-property-create',
  templateUrl: './dynamic-property-create.component.html',
  styleUrls: ['./dynamic-property-create.component.scss'],
})
export class DynamicPropertyCreateComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  isLoading = false;
  properties: DynamicPropertyModel[] = [];

  constructor(private dynamicFormBuilder: DynamicFormBuilder) {}

  onDialogEvent(button: ButtonEnum) {}

  ngOnInit(): void {
    this.properties = [
      new DynamicPropertyModel({
        code: 'displayName',
        displayName: 'Tên trường thông tin',
        dataType: DynamicDataTypeEnum.TEXT,
        hintText: 'Nhập tên trường thông tin',
        validators: [{ type: 'required', validatorValue: '1' }],
      }),
      new DynamicPropertyModel({
        code: 'tooltip',
        displayName: 'Tooltip',
        dataType: DynamicDataTypeEnum.TEXT,
        hintText: 'Nhập tooltip',
      }),
      new DynamicPropertyModel({
        code: 'hintText',
        displayName: 'PlaceHolder',
        dataType: DynamicDataTypeEnum.TEXT,
        hintText: 'Nhập Placeholder',
      }),
      new DynamicPropertyModel({
        code: 'dataType',
        displayName: 'kiểu dữ liệu',
        dataType: DynamicDataTypeEnum.LIST,
        inputType: DynamicInputTypeEnum.SINGLE_SELECT,
        defaultValue: JSON.stringify(DYNAMIC_DATA_TYPE),
        hintText: 'Chọn kiểu dữ liệu',
        validators: [{ type: 'required', validatorValue: '1' }],
      }),
      new DynamicPropertyModel({
        code: 'dob',
        displayName: 'Ngày sinh',
        dataType: DynamicDataTypeEnum.NUMBER,
        inputType: DynamicInputTypeEnum.PHONE_NUMBER,
        hintText: 'Ngày sinh',
        validators: [
          { type: 'required', validatorValue: '1' },
          { type: ValidatorTypeEnum.DOUBLE_MIN, validatorValue: '1' },
          { type: ValidatorTypeEnum.DOUBLE_MAX, validatorValue: '100' },
        ],
      }),
    ];
    this.formGroup = this.dynamicFormBuilder.generateFormGroup(
      this.formGroup,
      this.properties
    );
  }
}
