import { Pipe, PipeTransform } from '@angular/core';
import { ButtonStatusEnum } from '@shared/enums/button-status.enum';

@Pipe({
  name: 'getButtonStatus',
  pure: true,
})
export class GetButtonStatusPipe implements PipeTransform {
  transform(value: boolean, isSave?: boolean): any {
    if (value) {
      return ButtonStatusEnum.DISABLED;
    } else if (isSave) {
      return ButtonStatusEnum.LOADING;
    } else {
      return ButtonStatusEnum.ENABLE;
    }
  }
}
