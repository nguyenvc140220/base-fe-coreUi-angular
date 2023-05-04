import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

export function specialAlphabetCharactersValidator(control: AbstractControl): { [key: string]: any } | null {
  if (control.value) {
    const trimName = control.value.trim();
    const regex = new RegExp('^[a-zA-Z0-9.]*$');
    if (control.value && !regex.test(trimName)) return {'pattern': true};
    return null;
  }
  return null;
}

export function specialNonAlphabetCharactersValidator(control: AbstractControl): { [key: string]: any } | null {
  if (control.value) {
    const regex = new RegExp(
      "^(?=.*[ 0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ])([ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\\w\\s])+$"
    );
    if (control.value && !regex.test(control.value)) return {'pattern': true};
    return null;
  }
  return null;
}


export function nullOrEmptyValidator(control: AbstractControl): { [key: string]: any } | null {
  if (control.value !== undefined){
    if(typeof control.value == 'string' && !control.value.trim()){
      return {'nullOrEmpty': true};
    } else if(Array.isArray(control.value) && control.value.length === 0){
      return {'nullOrEmpty': true};
    }
  }
  return null;
}

export function greaterThanValidator(control1: string, control2: string): ValidatorFn  {
  return (form: AbstractControl): ValidationErrors | null => {
    const c1 = form.get(control1);
    const c2 = form.get(control2);
    if(c1 && c2 && c1.value < c2.value) {
      c1.setErrors({greaterThan : true});
      return { greaterThan : true}
    }
    c1.setErrors(null);
    return null;
  };
}


export function lessThanValidator(control1: string, control2: string): ValidatorFn  {
  return (form: AbstractControl): ValidationErrors | null => {
    const c1 = form.get(control1);
    const c2 = form.get(control2);
    if(c1 && c2 && c1.value > c2.value) {
      c1.setErrors({lessThan : true});
      return { lessThan: true}
    }
    c1.setErrors(null);
    return null;
  };
}


export function duplicateValidator(control: AbstractControl): { [key: string]: any } | null {
  if (control.value !== null && control.value !== undefined){
    const formArray = control?.parent?.parent as FormArray;
    if(formArray)
    {
      formArray?.controls?.forEach(g => {
        if(g.get("value").value !== null && g.get("value").value !== undefined && g.get("value").hasError("duplicate")){
          g.get("value").setErrors(null);
        }
      })
      if(formArray?.controls?.filter(c => c.get("value").value === control.value)?.length > 1){
        return {duplicate: true}
      }
    }
  }
  return null;
}
