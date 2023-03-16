import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '@shared/ultils/config.service';
import { Observable } from "rxjs";

export abstract class BaseService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    protected http: HttpClient,
    protected configService: ConfigService
  ) {}

  defaultGet<T>(url, params): Observable<T> {
    return this.http.get<T>(url, params ? { params: params } : {});
  }

  defaultPost<T>(url, body): Observable<T> {
    return this.http.post<T>(url, JSON.stringify(body), {
      headers: this.headers,
    });
  }
}
