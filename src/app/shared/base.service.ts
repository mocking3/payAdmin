import {Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {ApiException} from './exception/api.exception';
import {UserModel} from './auth/user.model';

@Injectable()
export class BaseService {
    token:string;
    currentUser:UserModel;

    protected extractData(res:Response) {
        let body = res.json() || {};
        // 如果返回错误
        if (body && body.code) {
            // let errMsg = body.msg ? `${body.msg}[${body.code}]` : '系统异常';
            throw new ApiException(body.code, body.msg);
        }
        return body;
    }

    protected handleError(error:any) {
        // let errMsg = (error.message) ? error.message :
        //     error.status ? `${error.status} - ${error.statusText}` : '系统异常';
        // console.error(errMsg); // log to console instead
        return Observable.throw(error);
    }

    getHeaders():Headers {
        return new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    }

    getAuthHeaders():Headers {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        headers.set('authorization', this.getToken());
        return headers;
    }

    setToken(token:string): void {
        this.token = token;
        localStorage.setItem('payAdmin-token', this.token);
    }

    removeToken(): void {
        this.token = null;
        localStorage.removeItem('payAdmin-token');
    }

    getToken():string {
        return localStorage.getItem('payAdmin-token');
    }

    setCurrentUser(currentUser:UserModel): void {
        this.currentUser = currentUser;
        localStorage.setItem('payAdmin-currentUser', JSON.stringify(this.currentUser));
    }

    removeCurrentUser(): void {
        this.currentUser = null;
        localStorage.removeItem('payAdmin-currentUser');
    }

    getCurrentUser():UserModel {
        let tmp = localStorage.getItem('payAdmin-currentUser');
        return JSON.parse(tmp);
    }
}