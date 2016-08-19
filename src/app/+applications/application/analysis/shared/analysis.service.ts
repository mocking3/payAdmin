import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

import {Observable}     from 'rxjs/Observable';

import {BaseService, Constants} from '../../../../shared';

@Injectable()
export class AnalysisService extends BaseService {

    constructor(private http:Http) {
        super();
    }

    getDataSummary(appId: number, timeBegin: string, timeEnd: string):Observable<any> {
        let url = Constants.SERVER_URL + `/statistics/${appId}/order/data?timeBegin=${timeBegin}&timeEnd=${timeEnd}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

    getChargeChangeWithOrderCount(appId: number, timeBegin: string, timeEnd: string):Observable<any> {
        let url = Constants.SERVER_URL + `/statistics/${appId}/order/count?timeBegin=${timeBegin}&timeEnd=${timeEnd}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

    getChargeChangeWithOrderFee(appId: number, timeBegin: string, timeEnd: string):Observable<any> {
        let url = Constants.SERVER_URL + `/statistics/${appId}/order/fee?timeBegin=${timeBegin}&timeEnd=${timeEnd}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

    getChargeChangeWithChannelCount(appId: number, timeBegin: string, timeEnd: string):Observable<any> {
        let url = Constants.SERVER_URL + `/statistics/${appId}/count/channels?timeBegin=${timeBegin}&timeEnd=${timeEnd}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

    getChargeChangeWithChannelFee(appId: number, timeBegin: string, timeEnd: string):Observable<any> {
        let url = Constants.SERVER_URL + `/statistics/${appId}/fee/channels?timeBegin=${timeBegin}&timeEnd=${timeEnd}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

    getChargeTotalWithChannelCount(appId: number, timeBegin: string, timeEnd: string):Observable<any> {
        let url = Constants.SERVER_URL + `/statistics/${appId}/channels/count?timeBegin=${timeBegin}&timeEnd=${timeEnd}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

    getChargeTotalWithChannelFee(appId: number, timeBegin: string, timeEnd: string):Observable<any> {
        let url = Constants.SERVER_URL + `/statistics/${appId}/channels/fee?timeBegin=${timeBegin}&timeEnd=${timeEnd}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }
}