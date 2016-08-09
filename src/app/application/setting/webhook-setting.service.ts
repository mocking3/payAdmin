import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable}     from 'rxjs/Observable';

@Injectable()
export class WebhookSettingService {
    private url = 'apps/${appId}/webhook-setting';
    constructor(private http:Http) {
    }

    getAddress(appId: number):Observable<string> {
        this.url = '/api/webhook-setting-get.json';
        // this.url = '/api/error.json';
        return this.http.get(this.url).map(this.extractData).map(data => data.callback).catch(this.handleError);
    }

    saveAddress(appId: number, address: string):Observable<string> {
        this.url = '/api/webhook-setting-put.json';
        let body = JSON.stringify({ address });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res:Response) {
        let body = res.json();
        // 如果返回错误
        if (body && body.code) {
            let errMsg = body.msg ? `${body.msg}[${body.code}]` : '系统异常';
            throw new Error(errMsg);
        }
        return body || {};
    }

    private handleError(error:any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}