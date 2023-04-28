import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

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
