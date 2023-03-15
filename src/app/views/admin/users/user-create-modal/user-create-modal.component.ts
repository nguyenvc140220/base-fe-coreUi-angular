import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonEnum } from '@shared/enums/button-status.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create-modal',
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.scss'],
})
export class UserCreateModalComponent implements OnInit {
  form: FormGroup;
  userPermissions = [
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Customer', value: 'CUSTOMER' },
    { label: 'Reporter', value: 'REPORTER' },
  ];

  constructor(public ref: DynamicDialogRef) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      fullName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      permission: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
    });
  }

  onDialogEvent(button) {
    if (button == ButtonEnum.CANCEL_BUTTON) {
      this.ref.close();
    } else if (button == ButtonEnum.SAVE_BUTTON) {
      this.ref.close('done');
    }
  }
}
