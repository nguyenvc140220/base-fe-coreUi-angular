import { DynamicEntityTypeEnum } from "@shared/enums/dynamic-entity-type.enum";

export class DynamicEntityEditModel {

  code: DynamicEntityTypeEnum;
  entityId: string
  properties: any;
}
