import {Injectable} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";
import {BaseService} from "../../shared/services/base.service.ts";
import {Constants} from "../../shared/constants.ts";
import {PwdForgetModel} from "./pwd-forget.model";

@Injectable()
export class PwdForgetService extends BaseService {

    private url = Constants.getServerUrl() + '/pwd-forget';

    constructor(private http:Http) {
        super();
    }

    resetPwd(pwdForgetModel: PwdForgetModel) {
        let body = `password=${pwdForgetModel.password}&mobile=${pwdForgetModel.mobile}&verifyCode=${pwdForgetModel.code}`;
        let options = new RequestOptions({ headers: this.getHeaders() });

        return this.http.post(this.url, body, options)
            .map(this.extractData).map(data => {
                // this.setToken(data.authorization);
                // this.setCurrentUser(data.user);
                // return data.user;
            }).catch(this.handleError);
    }
}
