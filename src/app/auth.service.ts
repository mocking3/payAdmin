import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {BaseService} from "./base.service";

@Injectable()
export class AuthService extends BaseService {
    isLoggedIn: boolean = false;
    private token: string;
    // 登录后重定向的页面
    redirectUrl: string;

    private url = '/pa/session';

    constructor(private http:Http) {
        super();
    }

    login(username: string, password: string) {
        //
        let body = { username: username, password: password};
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // logout() {
    //     this.isLoggedIn = false;
    // }

    getToken() {

    }
}
