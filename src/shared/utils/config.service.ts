import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AppConfigModel } from '@shared/models/config/app-config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private appConfig: AppConfigModel;

  constructor(private http: HttpClient) {}

  loadAppConfig() {
    return this.http
      .get(environment.appConfig)
      .toPromise()
      .then((config: AppConfigModel) => (this.appConfig = config));
  }

  get baseUrl() {
    return this.appConfig.baseUrl;
  }

  get keycloakUrl() {
    return this.appConfig.keycloakBaseUrl;
  }

  get mktBackendUrl() {
    return this.appConfig.mktBackendUrl;
  }

  get campaignPlanningUrl() {
    return this.appConfig.campaignPlanningUrl;
  }

  get workflowManagerUrl() {
    return this.appConfig.workflowManagerUrl;
  }

  get elasticQuery() {
    return this.appConfig.elasticQuery;
  }

  get socketEndpoint() {
    return this.appConfig.socketEndpoint;
  }

  get socketIOConfig() {
    return this.appConfig.socketIOConfig;
  }
}
