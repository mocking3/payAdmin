import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {BaseService} from "./base.service";

@Injectable()
export class AuthService extends BaseService {
    token: string;
    // 登录后重定向的页面
    redirectUrl: string;

    private url = 'http://localhost:7082/session';

    constructor(private http:Http) {
        super();
    }

    login(username: string, password: string) {
        // let body = { username: username, password: password};
        let body = 'username=' + username + '&password=' + password;
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url, body, options)
            .map(this.extractData).map(data => {
                this.setToken(data.authorization);
            }).catch(this.handleError);
    }

    setToken(token: string) {
        this.token = token;
        localStorage.setItem('token', this.token);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }
}
