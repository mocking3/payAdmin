import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

import {Observable}     from 'rxjs/Observable';

import {BaseService, Constants} from '../../../../shared';
import {WxconfigModel} from './wxconfig.model';

@Injectable()
export class WxpayService extends BaseService {
    private url = Constants.SERVER_URL + '/channels/wxpay';
    constructor(private http:Http) {
        super();
    }

    getWxconfigs():Observable<WxconfigModel[]> {
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.url, options).map(this.extractData).catch(this.handleError);
    }

    createWxconfig(wxconfig: WxconfigModel):Observable<WxconfigModel> {
        let body = `wxAppId=${wxconfig.wxAppId}&wxAppName=${wxconfig.wxAppName}&channelType=${wxconfig.channelType}&wxKey=${wxconfig.wxKey}&mchId=${wxconfig.mchId}&certLocalPath=${wxconfig.certLocalPath}&certPwd=${wxconfig.certPwd}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url, body, options)
            .map(this.extractData).map(data => {
                wxconfig.id = data.id;
                wxconfig.createTime = new Date().getMilliseconds();
                wxconfig.status = true;
                return wxconfig;
            })
            .catch(this.handleError);
    }

    updateWxconfig(wxconfig: WxconfigModel):Observable<WxconfigModel> {
        let url = `${this.url}/${wxconfig.id}`;
        let body = `wxAppId=${wxconfig.wxAppId}&wxAppName=${wxconfig.wxAppName}&channelType=${wxconfig.channelType}&wxKey=${wxconfig.wxKey}&mchId=${wxconfig.mchId}&certLocalPath=${wxconfig.certLocalPath}&certPwd=${wxconfig.certPwd}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });

        return this.http.put(url, body, options)
            .map(this.extractData).catch(this.handleError);
    }

    changeStatus(id: number,status: boolean):Observable<WxconfigModel> {
        let url = `${this.url}/${id}/status`;
        let body = `active=${status}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });

        return this.http.put(url, body, options)
            .map(this.extractData).catch(this.handleError);
    }
}