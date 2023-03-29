import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonEnum, ButtonStatusEnum } from '@shared/enums/button-status.enum';

@Component({
  selector: 'app-dialog-button',
  templateUrl: './dialog-button.component.html',
  styleUrls: ['./dialog-button.component.scss'],
})
export class DialogButtonComponent {
  buttonStatus = ButtonStatusEnum;
  buttonEnum = ButtonEnum;
  buttonClicked: ButtonEnum;

  @Input() status = this.buttonStatus.ENABLE;
  @Input() showDraft = false;
  @Input() showReset = false;
  @Input() saveLabel = 'Lưu';
  @Input() saveIcon = 'pi pi-save';

  @Input() resetLabel = 'Phục hồi mặc định';
  @Input() resetIcon = 'pi pi-undo';
  @Output() event: EventEmitter<ButtonEnum> = new EventEmitter();

  onClick(button: ButtonEnum) {
    this.buttonClicked = button;
    this.event.emit(button);
  }
}
