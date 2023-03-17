import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {
  AuthBaseResponse,
  AuthModel,
  AuthRequest,
  ChangePasswordRequest,
} from '@shared/models';
import Swal from 'sweetalert2';
import { AppConstants } from '@shared/AppConstants';
import { BaseService } from '@shared/services/base.service';
import { ConfigService } from '@shared/ultils/config.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  public currentUser: Observable<AuthModel>;

  private currentUserSubject: BehaviorSubject<AuthModel>;

  constructor(
    protected _http: HttpClient,
    protected _configService: ConfigService
  ) {
    super(_http, _configService);
    this.currentUserSubject = new BehaviorSubject<AuthModel>(
      JSON.parse(localStorage.getItem(AppConstants.AUTHENTICATION_STORE_KEY))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthModel {
    return this.currentUserSubject.value;
  }

  login(request: AuthRequest) {
    return this.defaultPost<AuthBaseResponse<AuthModel>>(
      `${this._configService.keycloakUrl}/v1.0/login`,
      {
        username: request.username,
        password: request.password,
      }
    ).pipe(
      map((response) => {
        // login successful if there's a jwt token in the response
        if (response.statusCode == 200 && response.data.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          response.data.remember_me = request.remember_me;
          response.data.username = request.username;
          localStorage.setItem(
            AppConstants.AUTHENTICATION_STORE_KEY,
            JSON.stringify(response.data)
          );
          // notify
          this.currentUserSubject.next(response.data);
        } else if (response.statusCode == 401) {
          if (!response.data.request_action)
            Swal.fire({
              icon: 'error',
              title: 'Lỗi...',
              text: `Tên tài khoản hoặc mật khẩu không chính xác!`,
            }).then();
          this.currentUserSubject.next(null);
        }

        return response.data;
      })
    );
  }

  refreshtoken() {
    const currentUser = this.currentUserValue;
    if (currentUser && currentUser.refresh_token && currentUser.remember_me) {
      return this.defaultPost<AuthBaseResponse<AuthModel>>(
        `${this._configService.keycloakUrl}/v1.0/refresh-token`,
        {
          refresh_token: currentUser.refresh_token,
        }
      ).pipe(
        map((response) => {
          // login successful if there's a jwt token in the response
          if (response.statusCode == 200 && response.data.access_token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            response.data.remember_me = true;
            localStorage.setItem(
              AppConstants.AUTHENTICATION_STORE_KEY,
              JSON.stringify(response.data)
            );
            // notify
            this.currentUserSubject.next(response.data);
          }

          return response.data;
        })
      );
    }
    return new Observable<AuthModel>(null);
  }

  logout() {
    const currentUser = this.currentUserValue;
    // remove user from local storage to log user out
    localStorage.removeItem(AppConstants.AUTHENTICATION_STORE_KEY);
    if (currentUser && currentUser.refresh_token) {
      return this.defaultPost(
        `${this._configService.keycloakUrl}/v1.0/logout`,
        {
          refresh_token: currentUser.refresh_token,
        }
      ).subscribe((res) => {});
    }
    // notify
    this.currentUserSubject.next(null);
  }

  changePassword(request: ChangePasswordRequest) {
    return this.defaultPost<AuthBaseResponse<AuthModel>>(
      `${this.configService.keycloakUrl}/v1.0/reset-password`,
      {
        username: request.username,
        password: request.password,
        new_password: request.new_password,
        confirm_password: request.confirm_password,
      }
    );
  }
}
