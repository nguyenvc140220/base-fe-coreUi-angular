import { Component, OnInit } from '@angular/core';
import { BreadcrumbStore } from '@shared/services/breadcrumb.store';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ButtonEnum } from '@shared/enums/button-status.enum';
import { AuthenticationService } from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  // username: string;
  // password: any;
  // new_password: any;
  // confirm_password: any;
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private breadcrumbStore: BreadcrumbStore,
    private readonly authenticationService: AuthenticationService
  ) {
    this.breadcrumbStore.items = [
      {
        label: 'Thay đổi mật khẩu',
      },
    ];
  }
  showPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  ngOnInit() {
    this.authenticationService.currentUserValue;
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup(
      {
        username: new FormControl({
          value:
            this.authenticationService.currentUserValue.username,
          disabled: true,
        },
          [Validators.required]
        ),
        password: new FormControl(null, [Validators.required]),
        new_password: new FormControl(null, [Validators.required]),
        confirm_password: new FormControl(null, [Validators.required]),
      },
      {
        validators: [
          ChangePasswordComponent.matchPassword(
            'new_password',
            'confirm_password'
          ),
          ChangePasswordComponent.matchOldPassword(
            'new_password',
            'password'
          ),
          ChangePasswordComponent.passwordValidator('new_password'),
        ],
      }
    );
  }

  static matchPassword(
    controlName: string,
    matchControlName: string
  ): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const matchControl = controls.get(matchControlName);
      if (!matchControl?.errors && control?.value !== matchControl?.value) {
        return { mismatch: true };
      }
      return null;
    };
  }
  static matchOldPassword(
    controlName: string,
    matchControlName: string
  ): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const matchControl = controls.get(matchControlName);
      if (!matchControl?.errors && control?.value == matchControl?.value) {
        return { matchOldPassword: true };
      }
      return null;
    };
  }

  get passwordMatchError() {
    return (
      this.form.getError('mismatch') &&
      this.form.get('confirm_password')?.touched
    );
  }
  get oldPasswordMatchError() {
    return (
      this.form.get('new_password')?.touched &&
      this.form.getError('matchOldPassword')
    );
  }

  get passwordRequirementError() {
    return (
      this.form.get('new_password')?.touched &&
      this.form.getError('passwordRequirement')
    );
  }

  static passwordValidator(controlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);

      if (control.value) {
        let valid =
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{6,32}/.test(
            control.value
          );
        if (!valid)
          return {
            passwordRequirement: true,
          };
      }
      return null;
    };
  }

  onDialogEvent(button) {
    if (button == ButtonEnum.CANCEL_BUTTON) {
      this.router.navigate(['/']);
    } else if (button == ButtonEnum.SAVE_BUTTON) {
      this.authenticationService.changePassword(this.form.value).subscribe({
        next: (response) => {
          if (response.statusCode == 200) {
            Swal.fire({
              icon: 'success',
              title: 'Thông báo',
              text: `Đổi mật khẩu thành công!`,
            }).then((result) => {
              this.authenticationService.logout();
              this.router.navigate(['/login']);
            });
          } else if (response.statusCode == 401) {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi...',
              text: `Mật khẩu không chính xác!`,
            }).then();
          }
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi...',
            text: `Đã có lỗi xảy ra, vui lòng liên hệ quản trị viên!`,
          }).then();
        },
      });
    }
  }
}
