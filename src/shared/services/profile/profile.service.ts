import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { ConfigService } from '@shared/utils/config.service';
import { AuthBaseResponse, AuthModel } from '@shared/models';
import { AuthenticationService } from '../auth';
import { Router } from '@angular/router';

const headers = new HttpHeaders().set('Content-Type', 'application/json');
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private _http: HttpClient,
    private readonly configService: ConfigService,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}
  changePassword(
    username: string,
    password: string,
    new_password: string,
    confirm_password: string
  ) {
    return this._http
      .post<AuthBaseResponse<AuthModel>>(
        `${this.configService.keycloakUrl}/v1.0/reset-password`,
        JSON.stringify({
          username: username,
          password: password,
          new_password: new_password,
          confirm_password: confirm_password,
        }),
        { headers: headers }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
