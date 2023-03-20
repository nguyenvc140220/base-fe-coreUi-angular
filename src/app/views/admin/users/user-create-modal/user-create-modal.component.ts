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
import { CreateUserRequestModel } from "@shared/models/users/create-user-request-model";
import { UserValidatorRequestModel } from "@shared/models/users/user-validator-request-model";

@Component({
  selector: 'app-user-create-modal',
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.scss'],
})
export class UserCreateModalComponent implements OnInit {
  form: FormGroup;
  userNameErr: string;
  emailErr: string;
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
      const createUserRequest = new CreateUserRequestModel();
      createUserRequest.email = this.form.controls['email']?.value?.trim();
      createUserRequest.enable = this.form.controls['enable']?.value;
      createUserRequest.fullName = this.form.controls['fullName']?.value?.trim();
      createUserRequest.username = this.form.controls['username']?.value?.trim();
      createUserRequest.roles = [this.form.controls['roles']?.value?.trim()]

      console.log(createUserRequest)
      // this.usersService.createUser(createUserRequest).subscribe({
      //   next: () => {
      //     this.ref.close('done');
      //     Swal.fire({
      //       icon: 'success',
      //       title: 'Thành công',
      //       text: `Lưu thành công!`,
      //     }).then();
      //   },
      //   error: (err) => {
      //     console.log(err)
      //   }
      // });
    }
  }

  validatorUserNameExist(event) {
    const userValidatorRequest = new UserValidatorRequestModel()
    userValidatorRequest.username = event.target?.value;
    return this.usersService.userValidators(userValidatorRequest).subscribe({
      next: (res) => {
        if (res && res.data) return this.userNameErr = "Dữ liệu đã tồn tại";
        this.userNameErr = null;
        return;
      }
    });
  }

  validatorEmailExist(event) {
    const userValidatorRequest = new UserValidatorRequestModel()
    userValidatorRequest.email = event.target?.value;
    return this.usersService.userValidators(userValidatorRequest).subscribe({
      next: (res) => {
        if (res && res.data) return this.emailErr = "Email đã bị trùng";
        this.emailErr = null;
        return;
      }
    });
  }
}
