import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

import {Observable}     from 'rxjs/Observable';

import {BaseService, Constants} from '../../../../shared';

@Injectable()
export class RefundOrderService extends BaseService {
    private url = Constants.getServerUrl() + '/apps/${appId}/refunds';
    constructor(private http:Http) {
        super();
    }

    getRefundOrders(appId: number, refundTimeBegin: string, refundTimeEnd: string, channel: string, keyword: string,
              pageNum: number, pageSize: number):Observable<any> {
        let url = this.url.replace(new RegExp('\\$\\{appId\\}','g'), appId + '') +
            `?refundTimeBegin=${refundTimeBegin}&refundTimeEnd=${refundTimeEnd}&channel=${channel}&keyword=${keyword}&pageNum=${pageNum}&pageSize=${pageSize}`;
        // this.url = '/api/webhook-setting-get.json';
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }
}