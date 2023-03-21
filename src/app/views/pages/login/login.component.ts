import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@shared/services';
import Swal from 'sweetalert2';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  loginForm: FormGroup;
  resetPasswordForm: FormGroup;
  showResetPaswordForm = false;

  showPassword = false;
  showRepeatPassword = false;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.authenticationService.logout();
    this.returnUrl = route.snapshot.queryParams['url'] || '/';
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.showResetPaswordForm = false;
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      remember_me: new FormControl(null, []),
    });

    this.resetPasswordForm = new FormGroup(
      {
        username: new FormControl(null, []),
        password: new FormControl(null, []),
        new_password: new FormControl(null, [Validators.required]),
        confirm_password: new FormControl(null, [Validators.required]),
      },
      {
        validators: [
          this.passwordValidator('new_password'),
          this.passwordMatch('new_password', 'confirm_password'),
        ],
      }
    );
  }

  passwordValidator(new_password: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      const password = group.controls[new_password]?.value;
      if (password) {
        if (password.length < 6) return {password_length_error: true};

        const valid =
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/.test(
            password
          );
        if (!valid) return {password_error: true};
      }

      return null;
    };
  }

  passwordMatch(new_password: string, confirm_password: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const newPass: string = group.controls[new_password]?.value;
      const confirm_pass: string = group.controls[confirm_password]?.value;
      if (newPass && confirm_pass && newPass !== confirm_pass) {
        return {
          match_error: true,
        };
      }
      return null;
    };
  }

  showError(controlName: string, error: string): boolean {
    return (
      this.resetPasswordForm.get(controlName).hasError(error) &&
      this.resetPasswordForm.get(controlName).touched
    );
  }

  changePassword() {
    if (this.resetPasswordForm.valid) {
      this.resetPasswordForm.patchValue({
        username: this.loginForm.value['username'],
        password: this.loginForm.value['password'],
      });
      this.authenticationService
        .changePassword(this.resetPasswordForm.value)
        .subscribe({
          next: (response) => {
            if (response.statusCode == 200) {
              Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: `Đổi mật khẩu thành công!`,
              }).then(() => this.initForm());
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

  login() {
    this.authenticationService.login(this.loginForm.value).subscribe({
      next: (user) => {
        if (user.access_token) this.router.navigate([this.returnUrl]);
        if (
          user.request_action &&
          user.request_action.length &&
          user.request_action[0] === 'UPDATE_PASSWORD'
        ) {
          this.showResetPaswordForm = true;
        }
      },
      error: (err) => {
        if (err && err.error && err.error.msg) {
          return Swal.fire({
            icon: 'error',
            title: 'Lỗi...',
            text: `Hệ thống MKT-${window.location.host.split(".")[0]} đã bị ngừng hoạt động!!`,
          }).then();
        }
        return Swal.fire({
          icon: 'error',
          title: 'Lỗi...',
          text: `Đã có lỗi xảy ra, vui lòng liên hệ quản trị viên!`,
        }).then();
      },
    });
  }
}
