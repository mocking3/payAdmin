import {Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';

import {Observable}     from 'rxjs/Observable';

@Injectable()
export class BaseService {
    token: string;
    
    protected extractData(res:Response) {
        let body = res.json() || {};
        // 如果返回错误
        if (body && body.code) {
            let errMsg = body.msg ? `${body.msg}[${body.code}]` : '系统异常';
            throw new Error(errMsg);
        }
        return body;
    }

    protected handleError(error:any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    getHeaders(): Headers {
        return new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    }

    getAuthHeaders(): Headers {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        headers.set('authorization', this.getToken());
        return headers;
    }

    setToken(token: string) {
        this.token = token;
        localStorage.setItem('token', this.token);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }
}