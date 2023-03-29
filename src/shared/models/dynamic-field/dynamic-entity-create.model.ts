import { DynamicEntityTypeEnum } from '@shared/enums/dynamic-entity-type.enum';

export class DynamicEntityCreateModel {
  code: DynamicEntityTypeEnum;
  properties: any;
}
