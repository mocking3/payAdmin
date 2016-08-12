import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

import {Observable}     from 'rxjs/Observable';
import {BaseService} from "../../base.service";
import {SERVER_URL} from "../../app.constants";

@Injectable()
export class AnalysisService extends BaseService {

    constructor(private http:Http) {
        super();
    }

    getDataSummary(appId: number, currentDate: Date):Observable<any> {
        let dateTime = currentDate.toLocaleDateString();
        let url = SERVER_URL + `/statistics/${appId}/order/data?timeBegin=${dateTime}&timeEnd=${dateTime}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

    getChargeChangeWithCount(appId: number, currentDate: Date):Observable<any> {
        let dateTime = currentDate.toLocaleDateString();
        let url = SERVER_URL + `/statistics/${appId}/order/count?dateTime=${dateTime}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

    getChargeChangeWithFee(appId: number, currentDate: Date):Observable<any> {
        let dateTime = currentDate.toLocaleDateString();
        let url = SERVER_URL + `/statistics/${appId}/order/fee?dateTime=${dateTime}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

}