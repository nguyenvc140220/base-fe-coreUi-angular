import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum';

export class DynamicPropertyModel {
  code: string;
  displayName: string;
  id?: string;
  dataType?: DynamicDataTypeEnum;
  creationTime?: number;
  deletedTime?: number | undefined;
  isDisplay?: boolean;
  order?: number;
}
