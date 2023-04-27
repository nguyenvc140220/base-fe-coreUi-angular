import { DynamicDataTypeEnum } from "@shared/enums/dynamic-data-type.enum";
import { DynamicInputTypeEnum } from "@shared/enums/dynamic-input-type.enum";

export class DynamicPropertyCreateModel {
    code: string;
    displayName: string;
    tooltip: string;
    hintText: string;
    dataType: DynamicDataTypeEnum;
    inputType: DynamicInputTypeEnum;
    validators: string;
    editable: boolean;
    defaultValue: string;
    configurationable: boolean;
}

