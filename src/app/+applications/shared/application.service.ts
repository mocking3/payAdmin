import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {Constants, BaseService} from '../../shared';
import {ApplicationModel} from './';

@Injectable()
export class ApplicationService extends BaseService {

    private url = Constants.SERVER_URL + '/apps';

    constructor(private http:Http) {
        super();
    }

    getApplications():Observable<any> {
        // this.url = '/api/applications-get.json';
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.url, options).map(this.extractData).catch(this.handleError);
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
    
}
