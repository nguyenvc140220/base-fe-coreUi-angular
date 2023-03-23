import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonEnum } from '@shared/enums/button-status.enum';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {
  specialAlphabetCharactersValidator,
  specialNonAlphabetCharactersValidator
} from "@shared/validators/check-pecial-characters-validators";
import Swal from "sweetalert2";
import { UsersService } from "@shared/services/users/users.service";
import { CreateUserRequestModel } from "@shared/models/users/create-user-request-model";
import { UserValidatorRequestModel } from "@shared/models/users/user-validator-request-model";
import { map, Observable, Subject, switchMap, takeUntil, timer } from "rxjs";
import { UserModel } from "@shared/models/users/user.model";

@Component({
  selector: 'app-user-create-modal',
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.scss'],
})
export class UserCreateModalComponent implements OnInit {
  form: FormGroup;
  emailErr: string;
  userPermissions = [
    {label: 'Admin', value: 'ADMIN'},
    {label: 'Member', value: 'MEMBER'},
  ];

  userDto = new UserModel()
  private unsubscribe = new Subject();

  constructor(
    public ref: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, specialAlphabetCharactersValidator], this.validatorUserNameExist.bind(this)),
      fullName: new FormControl(null, [Validators.required, specialNonAlphabetCharactersValidator]),
      email: new FormControl(null, [Validators.required, Validators.email], this.validatorEmailExist.bind(this)),
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

      this.usersService.createUser(createUserRequest).subscribe({
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

  private validatorUserNameExist({value}: AbstractControl): Observable<ValidationErrors> {
    return timer(1000).pipe(
      switchMap(() => {
        const userValidatorRequest = new UserValidatorRequestModel
        userValidatorRequest.username = value;
        return this.usersService.userValidators(userValidatorRequest).pipe(
          takeUntil(this.unsubscribe),
          map((response) => {
            if (response.data) return {'userNameExist': true};
            return null;
          })
        )
      })
    );
  }

  private validatorEmailExist({value}: AbstractControl): Observable<ValidationErrors> {
    return timer(1000).pipe(
      switchMap(() => {
        const userValidatorRequest = new UserValidatorRequestModel
        userValidatorRequest.email = value;
        return this.usersService.userValidators(userValidatorRequest).pipe(
          takeUntil(this.unsubscribe),
          map((response) => {
            if (response.data) return {'emailExist': true};
            return null;
          })
        )
      })
    );
  }
}
