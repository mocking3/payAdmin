import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Constants} from '../constants';
import {BaseService} from './base.service';

@Injectable()
export class MessageService extends BaseService {
    private url: string = Constants.SERVER_URL + '/message';

    constructor(private http:Http) {
        super();
    }

    sendCode(scene: string):Observable<any>{
        let body = `scene=${scene}`;
        let options = new RequestOptions({ headers: this.getAuthHeaders() });
        return this.http.post(this.url, body, options).map(this.extractData).catch(this.handleError);
    }
}