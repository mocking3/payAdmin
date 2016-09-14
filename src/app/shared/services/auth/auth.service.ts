import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {BaseService} from '../base.service.ts';
import {Constants} from '../../constants.ts';
import {Observable}     from 'rxjs/Observable';
import {UserModel} from './user.model.ts';

@Injectable()
export class AuthService extends BaseService {
    // 登录后重定向的页面
    redirectUrl: string;

    private url = Constants.getServerUrl() + '/session';

    constructor(private http:Http) {
        super();
    }

    login(username: string, password: string): Observable<UserModel> {
        // let body = { username: username, password: password};
        let body = `username=${username}&password=${password}`;
        let options = new RequestOptions({ headers: this.getHeaders() });

        return this.http.post(this.url, body, options)
            .map(this.extractData).map(data => {
                this.setToken(data.authorization);
                this.setCurrentUser(data.user);
                return data.user;
            }).catch(this.handleError);
    }

    scanLogin(text: string): Observable<UserModel> {
        let url = this.url + '/scan';
        let body = `text=${text}`;
        let options = new RequestOptions({ headers: this.getHeaders() });

        return this.http.post(url, body, options)
            .map(this.extractData).map(data => {
                this.setToken(data.authorization);
                this.setCurrentUser(data.user);
                return data.user;
            }).catch(this.handleError);
    }

    getQrCode(): Observable<any>  {
        let url = this.url + '/scan';
        let options = new RequestOptions({ headers: this.getHeaders() });

        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
    
    logout() {
        let options = new RequestOptions({ headers: this.getAuthHeaders() });
        return this.http.delete(this.url, options).map(this.extractData).map(() => {
            this.removeToken();
            this.removeCurrentUser();
        }).catch(this.handleError);
    }
}
