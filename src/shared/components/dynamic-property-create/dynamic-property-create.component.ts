import { Component, OnInit } from '@angular/core';
import { ButtonEnum } from '@shared/enums/button-status.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum';

@Component({
  selector: 'app-dynamic-property-create',
  templateUrl: './dynamic-property-create.component.html',
  styleUrls: ['./dynamic-property-create.component.scss'],
})
export class DynamicPropertyCreateComponent implements OnInit {
  formGroup: FormGroup;
  isLoading = false;
  properties: DynamicPropertyModel[] = [];
  INPUT_TYPE = DynamicDataTypeEnum;

  constructor() {}

  onDialogEvent(button: ButtonEnum) {}

  isRequired(property: DynamicPropertyModel) {
    return (
      property.validators?.find((v) => v.type == 'required')?.validatorValue ===
        '1' ?? false
    );
  }

  maxLength(property: DynamicPropertyModel): number {
    var max_length = property.validators?.find(
      (v) => v.type == 'string_length_max'
    );
    if (
      property.dataType == DynamicDataTypeEnum.TEXT &&
      max_length &&
      max_length.validatorValue
    )
      return Number(max_length.validatorValue);
    return undefined;
  }
  ngOnInit(): void {
    this.properties = [
      {
        code: 'displayName',
        displayName: 'Tên trường thông tin',
        dataType: DynamicDataTypeEnum.TEXT,
        hintText: 'Nhập tên trường thông tin',
        validators: [{ type: 'required', validatorValue: '1' }],
      },
      {
        code: 'tooltip',
        displayName: 'Tooltip',
        dataType: DynamicDataTypeEnum.TEXT,
        hintText: 'Nhập tooltip',
      },
      {
        code: 'hintText',
        displayName: 'PlaceHolder',
        dataType: DynamicDataTypeEnum.TEXT,
        hintText: 'Nhập Placeholder',
      },
      {
        code: 'dataType',
        displayName: 'kiểu dữ liệu',
        dataType: DynamicDataTypeEnum.LIST,
        hintText: 'Chọn kiểu dữ liệu',
        validators: [{ type: 'required', validatorValue: '1' }],
      },
    ];
    this.formGroup = new FormGroup(
      this.properties.reduce((x, obj) => {
        return {
          ...x,
          [obj.code]: new FormControl(obj.defaultValue, []),
        };
      }, {})
    );
  }
}
