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

    currentChannel: ChannelModel;

    showNum: number = 0;
    channelChoose: number = -1;

    chooseChannels: any[];

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

    // ngAfterViewChecked() {
        // $('.toggle-switch').bootstrapSwitch({
        //     size: 'mini',
        //     onSwitchChange: function (event: any, state: boolean) {
        //         console.log(event);
        //     }
        // });
    // }

    getChannels() {
        this.channelSettingService.getChannels(this.appId).subscribe(
            data => {
                this.channels = [data.APP, data.NATIVE, data.WAP];
            },
            error => {throw error});
    }

    setChannelStatus(channel: ChannelModel) {
        this.currentChannel = channel;
        if (this.currentChannel.status == 1) {
            this.currentChannel.status = 0;
            this.channelSettingService.updateChannel(this.appId, this.currentChannel).subscribe(
                () => {
                    this.message = '禁用成功';
                    this.toastService.triggerToast('提示', this.message, 'success');
                },
                error => {throw error});
        } else {
            // 如果有帐号，直接启用，如果没有，弹出帐号选择
            if (this.currentChannel.choiceId != null) {
                this.currentChannel.status = 1;
                this.channelSettingService.updateChannel(this.appId, this.currentChannel).subscribe(
                    () => {
                        this.message = '启用成功';
                        this.toastService.triggerToast('提示', this.message, 'success');
                    },
                    error => {throw error});
            } else {
                // 获取帐号
                this.channelSettingService.getChooseChannels(this.appId, channel.type, channel.pcode).subscribe(
                    data => {
                        this.chooseChannels = data;
                        if (this.chooseChannels.length > 0) {
                            // 有支付账号
                            this.channelChoose = 1;
                        } else {
                            // 无支付账号
                            this.channelChoose = 2;
                        }
                    },
                    error => {throw error});
            }
        }
    }

    cancel() {
        if (this.currentChannel.choiceId == null) {
            this.currentChannel.status = 0;
        }
        this.channelChoose = -1;
    }
}
