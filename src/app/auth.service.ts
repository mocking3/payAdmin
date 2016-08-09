import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {BaseService} from "./base.service";

@Injectable()
export class AuthService extends BaseService {
    // 登录后重定向的页面
    redirectUrl: string;

    private url = 'http://localhost:7082/session';

    constructor(private http:Http) {
        super();
    }

    login(username: string, password: string) {
        // let body = { username: username, password: password};
        let body = 'username=' + username + '&password=' + password;
        let options = new RequestOptions({ headers: this.getHeaders() });

        return this.http.post(this.url, body, options)
            .map(this.extractData).map(data => {
                this.setToken(data.authorization);
            }).catch(this.handleError);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}
