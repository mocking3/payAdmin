import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

import {Observable}     from 'rxjs/Observable';

import {BaseService, Constants} from '../../../../shared';

@Injectable()
export class OrderService extends BaseService {
    private url = Constants.getServerUrl() + '/apps/${appId}/orders';
    constructor(private http:Http) {
        super();
    }

    getOrders(appId: number, orderTimeBegin: string, orderTimeEnd: string, channel: string, outTradeNo: string,
              pageNum: number, pageSize: number):Observable<any> {
        let url = this.url.replace(new RegExp('\\$\\{appId\\}','g'), appId + '') +
            `?orderTimeBegin=${orderTimeBegin}&orderTimeEnd=${orderTimeEnd}&channel=${channel}&outTradeNo=${outTradeNo}&pageNum=${pageNum}&pageSize=${pageSize}`;
        // this.url = '/api/webhook-setting-get.json';
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }
}