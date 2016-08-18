import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

import {Observable}     from 'rxjs/Observable';

import {BaseService, SERVER_URL} from '../../../../shared';

@Injectable()
export class AnalysisService extends BaseService {

    constructor(private http:Http) {
        super();
    }

    getDataSummary(appId: number, timeBegin: string, timeEnd: string):Observable<any> {
        let url = SERVER_URL + `/statistics/${appId}/order/data?timeBegin=${timeBegin}&timeEnd=${timeEnd}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

    getChargeChangeWithCount(appId: number, timeBegin: string, timeEnd: string):Observable<any> {
        let url = SERVER_URL + `/statistics/${appId}/order/count?timeBegin=${timeBegin}&timeEnd=${timeEnd}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

    getChargeChangeWithFee(appId: number, timeBegin: string, timeEnd: string):Observable<any> {
        let url = SERVER_URL + `/statistics/${appId}/order/fee?timeBegin=${timeBegin}&timeEnd=${timeEnd}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }
}