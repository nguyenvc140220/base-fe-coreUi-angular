import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { specialNonAlphabetCharactersValidator } from "@shared/validators/check-pecial-characters-validators";
import { UserModel } from "@shared/models/users/user.model";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { UsersService } from "@shared/services/users/users.service";
import { ButtonEnum } from "@shared/enums/button-status.enum";
import { CreateUserRequestModel } from "@shared/models/users/create-user-request-model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss']
})
export class UserEditModalComponent implements OnInit {
  form: FormGroup;
  userDto = new UserModel()
  userPermissions = [
    {label: 'Admin', value: 'ADMIN'},
    {label: 'Member', value: 'MEMBER'},
  ];

  constructor(
    public ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.initFormEdit();
    if (this.dynamicDialogConfig.data.userId) {
      this.getUserById(this.dynamicDialogConfig.data.userId);
    }
  }

  private initFormEdit(): void {
    this.form = new FormGroup({
      username: new FormControl(null),
      fullName: new FormControl([Validators.required, specialNonAlphabetCharactersValidator]),
      email: new FormControl(null),
      phone: new FormControl(null),
      roles: new FormControl(null, [Validators.required]),
      enable: new FormControl(true),
    })
  }


  onDialogEvent(button) {
    if (button == ButtonEnum.CANCEL_BUTTON) {
      this.ref.close();
    } else if (button == ButtonEnum.SAVE_BUTTON) {
      const createUserRequest = new CreateUserRequestModel();
      createUserRequest.enable = this.form.controls['enable']?.value;
      createUserRequest.fullName = this.form.controls['fullName']?.value?.trim();
      createUserRequest.roles = [this.form.controls['roles']?.value?.trim()]
      this.usersService.updateUserById(createUserRequest).subscribe({
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

  getUserById(UserId: string) {
    this.usersService.getUserById(UserId).subscribe({
      next: (res) => {
        this.userDto = res.data
        this.initFormEdit();
        this.form.patchValue(res.data)
        this.form.controls['username'].disable();
        this.form.controls['email'].disable();
      }
    });
  }
}
