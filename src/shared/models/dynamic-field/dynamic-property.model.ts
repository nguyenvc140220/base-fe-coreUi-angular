import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum';

export class DynamicPropertyModel {
  code: string;
  displayName: string;
  description?: string;
  editable?: boolean;
  removeable?: boolean;
  id?: string;
  dataType?: DynamicDataTypeEnum;
  inputType?: string;
  hintText?: string;
  tooltip?: string;
  defaultValue?: string;
  validators?: Validator[];
  creationTime?: number;
  deletedTime?: number | undefined;
  isDisplay?: boolean;
  order?: number;
}

export class Validator {
  type: string;
  validatorValue: string;
}
