import { Injectable } from '@angular/core';
import {
  DynamicPropertyModel,
  PropertyValidator,
} from '@shared/models/dynamic-field/dynamic-property.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorTypeEnum } from '@shared/enums/validator-type.enum';

@Injectable({ providedIn: 'root' })
export class DynamicFormBuilder {
  constructor() {}
  generateFormGroup(
    formGroup: FormGroup,
    properties: DynamicPropertyModel[]
  ): FormGroup {
    properties.forEach((p) => {
      formGroup.addControl(
        p.code,
        new FormControl(
          null,
          p.validators
            ?.map((v) => {
              return this.getFormValidator(v);
            })
            ?.filter((x) => x != null) ?? []
        )
      );
    });
    return formGroup;
  }

  getFormValidator(validator: PropertyValidator) {
    if (validator.validatorValue) {
      let value = Number(validator.validatorValue);
      switch (validator.type) {
        case ValidatorTypeEnum.REQUIRED:
          return isNaN(value) || value < 1 ? null : Validators.required;
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
