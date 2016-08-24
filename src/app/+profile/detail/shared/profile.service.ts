import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {Constants, BaseService} from '../../../shared';
import {UserModel} from '../../../shared/auth';

@Injectable()
export class ProfileService extends BaseService {

    private url = Constants.SERVER_URL + '/profile';

    constructor(private http:Http) {
        super();
    }

    getProfile(): Observable<UserModel> {
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.url, options).map(this.extractData).catch(this.handleError);
    }

    updateProfile(nickname: string, headIcoUrl: string):Observable<any> {
        let body = `nickname=${nickname}&headIcoUrl=${headIcoUrl}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.url, body, options)
            .map(this.extractData).catch(this.handleError);
    }
}
