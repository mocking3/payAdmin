import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BaseService} from "../base.service";

@Injectable()
export class ApplicationService extends BaseService {

    private url = 'http://localhost:7082/apps';

    constructor(private http:Http) {
        super();
    }

    getApplications():Observable<any> {
        // this.url = '/api/applications-get.json';
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.url, options).map(this.extractData).catch(this.handleError);
    }
}
