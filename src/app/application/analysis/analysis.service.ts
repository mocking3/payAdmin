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

    getDataSummary(appId: number):Observable<any> {
        let url = SERVER_URL + `/statistics/${appId}/order/data`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

    getChargeChangeWithCount(appId: number):Observable<any> {
        let url = SERVER_URL + `/statistics/${appId}/order/count`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

    getChargeChangeWithFee(appId: number):Observable<any> {
        let url = SERVER_URL + `/statistics/${appId}/order/fee`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

}