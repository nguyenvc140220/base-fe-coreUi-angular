import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum';
import { DynamicInputTypeEnum } from '@shared/enums/dynamic-input-type.enum';
import { ValidatorTypeEnum } from '@shared/enums/validator-type.enum';

export class DynamicPropertyModel {
  code: string;
  displayName: string;
  description?: string;
  editable?: boolean;
  removable?: boolean;
  id?: string;
  dataType?: DynamicDataTypeEnum;
  inputType?: DynamicInputTypeEnum;
  hintText?: string;
  tooltip?: string;
  defaultValue?: string;
  validators?: PropertyValidator[];
  creationTime?: number;
  deletedTime?: number | undefined;
  isDisplay?: boolean;
  order?: number;
  isFixed?: boolean;

  visible?: boolean;
  disabled?: boolean;
  hidden?: boolean;

  constructor(data?: any) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
  onDataChange?: Function;
  tag?: string;
}

export class PropertyValidator {
  type: ValidatorTypeEnum;
  validatorValue: string;
}
