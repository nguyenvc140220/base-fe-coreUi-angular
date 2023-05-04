import { Injectable } from '@angular/core';
import { DynamicPropertyModel, PropertyValidator, } from '@shared/models/dynamic-field/dynamic-property.model';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ValidatorTypeEnum } from '@shared/enums/validator-type.enum';
import { DynamicDataTypeEnum } from "@shared/enums/dynamic-data-type.enum";
import { greaterThanValidator, nullOrEmptyValidator } from "@shared/validators/check-pecial-characters-validators";

@Injectable({ providedIn: 'root' })
export class DynamicFormBuilder {
  constructor() {}
  generateFormGroup(
    formGroup: FormGroup,
    properties: DynamicPropertyModel[],
    validators: ValidatorFn[] = []
  ): FormGroup {
    properties.forEach((p) => {
      formGroup.addControl(
        p.code,
        new FormControl(
          this.getDefaultValue(p),
          p.validators
            ?.map((v) => {
              return this.getFormValidator(v);
            })
            ?.filter((x) => x != null) ?? []
        )
      );
    });
    formGroup.addValidators(validators);
    return formGroup;
  }

  getFormValue(
    formGroup: FormGroup,
    name: string
  ){
    return formGroup?.value[name];
  }

  getDefaultValue(p: DynamicPropertyModel){
    if(p.defaultValue){
      switch (p.dataType){
        case DynamicDataTypeEnum.TEXT:
          return p.defaultValue;
        case DynamicDataTypeEnum.BOOLEAN:
          return Boolean(p.defaultValue);
        case DynamicDataTypeEnum.NUMBER:
          return Number(p.defaultValue);
        case DynamicDataTypeEnum.DATETIME:
          return new Date(p.defaultValue);
        case DynamicDataTypeEnum.LIST:
          const values = JSON.parse(p.defaultValue);
          return values && values.length > 0 ? values[0].value : null;
        default:
          return p.defaultValue;
      }
    }
    return null;
  }

  getFormValidator(validator: PropertyValidator) {
    if (validator.validatorValue) {
      let value = Number(validator.validatorValue);
      switch (validator.type) {
        case ValidatorTypeEnum.REQUIRED:
          return isNaN(value) || value < 1 ? null : Validators.required;
        case ValidatorTypeEnum.NOT_NULL:
          return isNaN(value) || value < 1 ? null : nullOrEmptyValidator;
        case ValidatorTypeEnum.STRING_LENGTH_MAX:
          return isNaN(value) ? null : Validators.maxLength(value);
        case ValidatorTypeEnum.STRING_LENGTH_MIN:
          return isNaN(value) ? null : Validators.minLength(value);
        case ValidatorTypeEnum.DOUBLE_MAX:
          return isNaN(value) ? null : Validators.max(value);
        case ValidatorTypeEnum.DOUBLE_MIN:
          return isNaN(value) ? null : Validators.min(value);
        case ValidatorTypeEnum.STRING_PATTERN:
          return Validators.pattern(validator.validatorValue);
        default:
          return null;
      }
    }
    return null;
  }
}
