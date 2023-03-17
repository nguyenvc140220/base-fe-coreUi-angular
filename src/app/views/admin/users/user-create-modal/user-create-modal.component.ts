import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonEnum } from '@shared/enums/button-status.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  specialAlphabetCharactersValidator,
  specialNonAlphabetCharactersValidator
} from "@shared/validators/check-pecial-characters-validators";
import Swal from "sweetalert2";
import { UsersService } from "@shared/services/users/users.service";

@Component({
  selector: 'app-user-create-modal',
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.scss'],
})
export class UserCreateModalComponent implements OnInit {
  form: FormGroup;
  userPermissions = [
    {label: 'Admin', value: 'ADMIN'},
    {label: 'Member', value: 'MEMBER'},
  ];

  constructor(
    public ref: DynamicDialogRef,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, specialAlphabetCharactersValidator]),
      fullName: new FormControl(null, [Validators.required, specialNonAlphabetCharactersValidator]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null),
      roles: new FormControl(null, [Validators.required]),
      enable: new FormControl(true),
    });
  }

  onDialogEvent(button) {
    if (button == ButtonEnum.CANCEL_BUTTON) {
      this.ref.close();
    } else if (button == ButtonEnum.SAVE_BUTTON) {
      this.form.patchValue({
        roles: [this.form.value['roles']]
      })
      this.usersService.createUser(this.form.value).subscribe({
        next: () => {
          this.ref.close('done');
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: `Lưu thành công!`,
          }).then();
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
  }
}
