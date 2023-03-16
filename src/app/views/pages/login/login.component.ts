import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@shared/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  username: string;
  password: string;
  remember_me = false;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.authenticationService.logout();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['url'] || '/';
  }

  login() {
    this.authenticationService
      .login(
        this.username.toLowerCase().trim(),
        this.password,
        this.remember_me
      )
      .subscribe({
        next: (user) => {
          if (user.access_token) this.router.navigate([this.returnUrl]);
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
