import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

import {Observable}     from 'rxjs/Observable';

import {BaseService, Constants} from '../../../../../shared';
import {ChannelModel} from "./channel.model";

@Injectable()
export class ChannelSettingService extends BaseService {
    private url = Constants.SERVER_URL + '/apps/${appId}/channel-setting';
    constructor(private http:Http) {
        super();
    }

    getChannels(appId: number):Observable<any> {
        let url = this.url.replace(new RegExp('\\$\\{appId\\}','g'), appId + '');
        // this.url = '/api/webhook-setting-get.json';
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }

    updateChannel(appId: number, channel: ChannelModel):Observable<any> {
        let url = this.url.replace(new RegExp('\\$\\{appId\\}','g'), appId + '') + '/' + channel.configName;
        // this.url = '/api/webhook-setting-put.json';
        let body = `channelId=${channel.choiceId}&status=${channel.status}&serialNo=${channel.serialNo}`;
        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });

        return this.http.put(url, body, options).map(this.extractData).catch(this.handleError);
    }

    getChooseChannels(appId: number, type: string, pcode: string):Observable<any[]> {
        let url = this.url.replace(new RegExp('\\$\\{appId\\}','g'), appId + '') + '/' + type
            + '/channels?pCode=' + pcode;

        let headers = this.getAuthHeaders();
        let options = new RequestOptions({ headers: headers });

        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    }
}