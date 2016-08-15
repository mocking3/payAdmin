import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {BaseService} from "../../base.service";
import {SERVER_URL} from "../../app.constants";

@Injectable()
export class OrderService extends BaseService {
    private url = SERVER_URL + '/apps/${appId}/orders';
    constructor(private http:Http) {
        super();
    }

    getOrders(appId: number, pageNum: number, pageSize: number):Observable<any> {
        let url = this.url.replace(new RegExp('\\$\\{appId\\}','g'), appId + '') + `?pageNum=${pageNum}&pageSize=${pageSize}`;
        // this.url = '/api/webhook-setting-get.json';
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }
}