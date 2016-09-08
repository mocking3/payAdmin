import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {Constants, BaseService} from '../../shared';
import {ApplicationModel} from './';

@Injectable()
export class ApplicationService extends BaseService {

    private url = Constants.getServerUrl() + '/apps';

    constructor(private http:Http) {
        super();
    }

    getApplications():Observable<any> {
        // this.url = '/api/applications-get.json';
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.url, options).map(this.extractData).catch(this.handleError);
    }

    getApplication(appId: number): Observable<ApplicationModel> {
        let url = `${this.url}/${appId}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({headers: headers});
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }


    createApplication(appName: string, appLogo: string):Observable<ApplicationModel> {
        // this.url = '/api/webhook-setting-put.json';
        let body = `appName=${appName}&appLogo=${appLogo}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url, body, options)
            .map(this.extractData).map(data => {
                let application = new ApplicationModel();
                application.id = data.id;
                application.appKey = data.appKey;
                application.name = appName;
                application.logo = appLogo;
                application.createTime = new Date().getTime();
                return application;
            })
            .catch(this.handleError);
    }

    updateApplication(appId: number, appName: string, appLogo: string):Observable<any> {
        let url = `${this.url}/${appId}`;
        let body = `appName=${appName}&appLogo=${appLogo}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        //TODO tomcat处理put有问题，改成post
        return this.http.post(url, body, options)
            .map(this.extractData).catch(this.handleError);
    }

    deleteApplication(appId: number): Observable<any> {
        let url = `${this.url}/${appId}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({headers: headers});
        return this.http.delete(url, options).map(this.extractData).catch(this.handleError);
    }

}
