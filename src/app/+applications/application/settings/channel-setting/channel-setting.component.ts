import { Component, OnInit, OnDestroy  } from '@angular/core';
import {NgClass} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import {ToastService} from '../../../../shared/services';
import {ChannelSettingService, ChannelModel} from './shared';

@Component({
    templateUrl: './channel-setting.component.html',
    styleUrls: ['./channel-setting.component.css'],
    providers: [ChannelSettingService],
    directives: [NgClass]
})
export class ChannelSettingComponent implements OnInit, OnDestroy  {
    appId: number;
    channels: ChannelModel[][];
    message: string;
    sub: any;

    showNum: number = 0;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private channelSettingService: ChannelSettingService,
                private toastService:ToastService) {
    }

    ngOnInit() {
        // 获取父路由变量
        this.sub = this.router.routerState.parent(this.route).params.subscribe(params => {
            this.appId = +params['id'];
            this.getChannels();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getChannels() {
        this.channelSettingService.getChannels(this.appId).subscribe(
            data => {
                this.channels = [data.APP, data.NATIVE, data.WAP];
            },
            error => {throw error});
    }

    setChannelStatus(channel: ChannelModel) {
        if (channel.status == 1) {
            channel.status = 0;
        } else {
            // 如果有帐号，直接启用，如果没有，弹出帐号选择
            // if (channel.choiceId != null)
            //     this.channelSettingService.updateChannel();
        }

    }
}
