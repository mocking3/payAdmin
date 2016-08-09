import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {BaseService} from "../../base.service";

@Injectable()
export class WebhookSettingService extends BaseService {
    private url = 'http://localhost:7082/apps/${appId}/webhook-setting';
    constructor(private http:Http) {
        super();
    }

    getAddress(appId: number):Observable<string> {
        this.url = this.url.replace(new RegExp('\\$\\{appId\\}','g'), appId + '');
        // this.url = '/api/webhook-setting-get.json';
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url, options).map(this.extractData).map(data => data.callback).catch(this.handleError);
    }

    saveAddress(appId: number, address: string):Observable<any> {
        this.url = this.url.replace(new RegExp('\\$\\{appId\\}','g'), appId + '');
        // this.url = '/api/webhook-setting-put.json';
        let body = 'callbackUrl=' + address;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}