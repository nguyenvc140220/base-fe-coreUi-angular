import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicPropertyModel } from '@shared/models/dynamic-field/dynamic-property.model';
import { DynamicDataTypeEnum } from '@shared/enums/dynamic-data-type.enum';
import { DynamicInputTypeEnum } from '@shared/enums/dynamic-input-type.enum';
import { ValidatorTypeEnum } from '@shared/enums/validator-type.enum';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent {
  @Input() formGroup: FormGroup;
  @Input() properties: DynamicPropertyModel[];
  @Input() gridLayout = 'col-6';
  DATA_TYPE = DynamicDataTypeEnum;
  INPUT_TYPE = DynamicInputTypeEnum;

  onShowDropdown(main: string, overlay: string): void {
    const dropdown = document.querySelector(main) as HTMLElement;
    const dropdownPanel = document.querySelector(overlay) as HTMLElement;
    dropdownPanel.style.minWidth = `${dropdown.clientWidth}px`;
    dropdownPanel.style.zIndex = '2001';
  }

  showError(name): string {
    let control = this.formGroup?.get(name);
    if (control && control.invalid && control.touched) {
      if (control?.errors?.required) return 'Đây là trường bắt buộc!';
      if (control?.errors?.minlength)
        return `Độ dài tối thiểu là ${control?.errors?.minlength?.requiredLength}`;
      if (control?.errors?.maxlength)
        return `Độ dài tối đa là ${control?.errors?.maxlength?.requiredLength}`;
      if (control?.errors?.min)
        return `Giá trị tối thiểu là ${control?.errors?.min?.min}`;
      if (control?.errors?.max)
        return `Giá trị tối đa là ${control?.errors?.max?.max}`;
      if (control?.errors?.pattern) return `Không đúng định dạng!`;
      return 'has error!';
    }
    return null;
  }

  onChange(property: DynamicPropertyModel, value){
    if(property?.onDataChange)
      property.onDataChange(value);
  }

  isRequired(property: DynamicPropertyModel) {
    return (
      property.validators?.find((v) => v.type == ValidatorTypeEnum.REQUIRED)
        ?.validatorValue === '1' ?? false
    );
  }

  maxLength(property: DynamicPropertyModel): number {
    var max_length = property.validators?.find(
      (v) => v.type == ValidatorTypeEnum.STRING_LENGTH_MAX
    );
    if (
      property.dataType == DynamicDataTypeEnum.TEXT &&
      max_length &&
      max_length.validatorValue
    )
      return Number(max_length.validatorValue);
    return undefined;
  }

  minLength(property: DynamicPropertyModel): number {
    var min_length = property.validators?.find(
      (v) => v.type == ValidatorTypeEnum.STRING_LENGTH_MIN
    );
    if (
      property.dataType == DynamicDataTypeEnum.TEXT &&
      min_length &&
      min_length.validatorValue
    )
      return Number(min_length.validatorValue);
    return undefined;
  }

  getBindableValues(property: DynamicPropertyModel) {
    return JSON.parse(property.defaultValue);
  }

  maxSelected(property: DynamicPropertyModel): number {
    var max_selected = property.validators?.find(
      (v) => v.type == ValidatorTypeEnum.LIST_MAX_CHOICE
    );
    if (
      property.dataType == DynamicDataTypeEnum.LIST &&
      property.inputType == DynamicInputTypeEnum.MULTI_SELECT &&
      max_selected &&
      max_selected.validatorValue
    )
      return Number(max_selected.validatorValue);
    return undefined;
  }

  floatingPoint(property: DynamicPropertyModel): number {
    var floatingPoint = property.validators?.find(
      (v) => v.type == ValidatorTypeEnum.DOUBLE_POINT
    );
    if (
      property.dataType == DynamicDataTypeEnum.NUMBER &&
      floatingPoint &&
      floatingPoint.validatorValue
    )
      return Number(floatingPoint.validatorValue);
    return undefined;
  }

  minValue(property: DynamicPropertyModel): number {
    var minValue = property.validators?.find(
      (v) => v.type == ValidatorTypeEnum.DOUBLE_MIN
    );
    if (
      property.dataType == DynamicDataTypeEnum.NUMBER &&
      minValue &&
      minValue.validatorValue
    )
      return Number(minValue.validatorValue);
    return undefined;
  }

  maxValue(property: DynamicPropertyModel): number {
    var maxValue = property.validators?.find(
      (v) => v.type == ValidatorTypeEnum.DOUBLE_MAX
    );
    if (
      property.dataType == DynamicDataTypeEnum.NUMBER &&
      maxValue &&
      maxValue.validatorValue
    )
      return Number(maxValue.validatorValue);
    return undefined;
  }
}
