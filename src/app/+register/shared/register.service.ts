import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

import {BaseService} from '../../shared/services/base.service.ts';
import {Constants} from '../../shared/constants.ts';
import {UserModel} from '../../shared/services/auth/user.model.ts';
import {RegisterModel} from "./register.model";

@Injectable()
export class RegisterService extends BaseService {

    private url = Constants.getServerUrl() + '/registion';

    constructor(private http:Http) {
        super();
    }

    register(registerModel: RegisterModel) {
        let body = `username=${registerModel.username}&password=${registerModel.password}&mobile=${registerModel.mobile}&verifyCode=${registerModel.code}`;
        let options = new RequestOptions({ headers: this.getHeaders() });

        return this.http.post(this.url, body, options)
            .map(this.extractData).map(data => {
                // this.setToken(data.authorization);
                // this.setCurrentUser(data.user);
                // return data.user;
            }).catch(this.handleError);
    }
}
