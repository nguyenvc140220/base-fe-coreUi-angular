import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonEnum } from '@shared/enums/button-status.enum';

@Component({
  selector: 'app-contact-create-modal',
  templateUrl: './contact-create-modal.component.html',
  styleUrls: ['./contact-create-modal.component.scss'],
})
export class ContactCreateModalComponent implements OnInit {
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
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      cmnd: new FormControl(null, [Validators.required]),
      sex: new FormControl(null, [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
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
