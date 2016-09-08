import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {Constants, BaseService, UserModel} from '../../shared';

@Injectable()
export class ProfileService extends BaseService {

    private url = Constants.getServerUrl() + '/profile';

    constructor(private http:Http) {
        super();
    }

    getProfile(): Observable<UserModel> {
        let currentUser:UserModel = this.getCurrentUser();
        if (currentUser && currentUser != null) {
            return Observable.create((observer: Observer<UserModel>) => {
                observer.next(currentUser);
                observer.complete();
            });
        }
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.url, options).map(this.extractData).map(data => {
            this.setCurrentUser(data);
            return data;
        }).catch(this.handleError);
    }

    updateProfile(nickname: string, headIcoUrl: string):Observable<any> {
        if (headIcoUrl == 'null')
            headIcoUrl = '';

        let body = `nickname=${nickname}&headIcoUrl=${headIcoUrl}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        //TODO tomcat处理put有问题，改成post
        return this.http.post(this.url, body, options)
            .map(this.extractData).map(() => {
                let currentUser: UserModel = this.getCurrentUser();
                currentUser.nickname = nickname;
                currentUser.headIcoUrl = headIcoUrl;
                this.setCurrentUser(currentUser);
            }).catch(this.handleError);
    }

    changeMobile(mobile: string, mcode: string) {
        let url = `${this.url}/bind/mobile`;
        let body = `mobile=${mobile}&verifyCode=${mcode}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        //TODO tomcat处理put有问题，改成post
        return this.http.post(url, body, options)
            .map(this.extractData).map(() => {
                let currentUser: UserModel = this.getCurrentUser();
                currentUser.mobile = mobile;
                this.setCurrentUser(currentUser);
            }).catch(this.handleError);
    }

    changeEmail(email: string, ecode: string) {
        let url = `${this.url}/bind/email`;
        let body = `email=${email}&verifyCode=${ecode}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        //TODO tomcat处理put有问题，改成post
        return this.http.post(url, body, options)
            .map(this.extractData).map(() => {
                let currentUser: UserModel = this.getCurrentUser();
                currentUser.email = email;
                this.setCurrentUser(currentUser);
            }).catch(this.handleError);
    }

    resetPassword(oldPassword: string, newPassword: string) {
        let url = `${this.url}/pwdreset`;
        let body = `oldPassword=${oldPassword}&newPassword=${newPassword}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        //TODO tomcat处理put有问题，改成post
        return this.http.post(url, body, options)
            .map(this.extractData).catch(this.handleError);
    }
}
