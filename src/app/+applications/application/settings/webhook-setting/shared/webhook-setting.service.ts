import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

import {Observable}     from 'rxjs/Observable';

import {BaseService, Constants} from '../../../../../shared';

@Injectable()
export class WebhookSettingService extends BaseService {
    private url = Constants.getServerUrl() + '/apps/${appId}/webhook-setting';
    constructor(private http:Http) {
        super();
    }

    getAddress(appId: number):Observable<string> {
        let url = this.url.replace(new RegExp('\\$\\{appId\\}','g'), appId + '');
        // this.url = '/api/webhook-setting-get.json';
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).map(data => data.CALLBACK).catch(this.handleError);
    }

    saveAddress(appId: number, address: string):Observable<any> {
        let url = this.url.replace(new RegExp('\\$\\{appId\\}','g'), appId + '');
        // this.url = '/api/webhook-setting-put.json';
        let body = 'callbackUrl=' + address;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        //TODO tomcat处理put有问题，改成post
        return this.http.post(url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}