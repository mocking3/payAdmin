import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {BaseService} from "./base.service";
import {SERVER_URL} from "./app.constants";

@Injectable()
export class AuthService extends BaseService {
    // 登录后重定向的页面
    redirectUrl: string;

    private url = SERVER_URL + '/session';

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
    
    logout() {
        let options = new RequestOptions({ headers: this.getAuthHeaders() });
        return this.http.delete(this.url, options).map(this.extractData).map(() => {
            this.removeToken();
        }).catch(this.handleError);
    }
}
