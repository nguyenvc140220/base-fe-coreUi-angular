import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '@shared/utils/config.service';
import { Observable } from 'rxjs';

export abstract class BaseService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    protected http: HttpClient,
    protected configService: ConfigService
  ) {}

  defaultGet<T>(url, params): Observable<T> {
    return this.http.get<T>(url, params ? {params: params} : {});
  }

  defaultPost<T>(url, body): Observable<T> {
    return this.http.post<T>(url, JSON.stringify(body), {
      headers: this.headers,
    });
  }

  defaultUploadFile<T>(url, file: File): Observable<T> {
    let formData = new FormData();
    formData.append("file", file, file.name);
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    })
    return this.http.post<T>(url, formData, {
      headers: headers,
    });
  }

  defaultPut<T>(url, body): Observable<T> {
    return this.http.put<T>(url, JSON.stringify(body), {
      headers: this.headers,
    });
  }

  defaultDelete<T>(url, params): Observable<T> {
    return this.http.delete<T>(url, params ? {params: params} : {});
  }
}
