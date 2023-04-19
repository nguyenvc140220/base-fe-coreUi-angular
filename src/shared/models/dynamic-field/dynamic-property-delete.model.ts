import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum';
import { DynamicInputTypeEnum } from '@shared/enums/dynamic-input-type.enum';
import { ValidatorTypeEnum } from '@shared/enums/validator-type.enum';

export class DynamicPropertyDeleteModel {
  code: string;

  constructor(data?: any) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}

