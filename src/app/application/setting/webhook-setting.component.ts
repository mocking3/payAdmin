import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {WebhookSettingService} from "./webhook-setting.service";
@Component({
    template: `
        {{message}}
        <!-- webhook -->
        <div class="pannel">
            <p class="common_title">webhook设置</p>
            <ul class="usual_setting_list">
                <li>
                    <p class="list_name">地址</p>
                    <input type="text" [(ngModel)]="address">
                </li>
            </ul>
            <p (click)="saveAddress()" class="list_sure_btn">保存</p>
        </div>
    `,
    styles: [`
        .usual_setting_list{
            margin-left: 25px;
            margin-top: 20px;
        }
        .usual_setting_list li{
            margin-bottom: 20px;
        }
        .list_name{
            display: inline-block;
            width: 110px;
            text-align: right;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #354285;
            margin-right: 20px;
        }
        .usual_setting_list input{
            width: 430px;
            height: 40px;
            padding-left: 10px;
            outline: none;
            border: 0;
            border: 1px solid #eef1f9;
            background-color: #fafbfe;
            border-radius: 3px;
        }
        .list_sure_btn{
            font-size: 16px;
            color: #ffffff;
            width: 150px;
            height: 30px;
            margin: 0 auto;
            margin-top: 40px;
            line-height: 30px;
            text-align: center;
            background-color: #4696e4;
            border-radius: 3px;
        }
    `],
    providers: [WebhookSettingService]
})
export class WebhookSettingComponent implements OnInit, OnDestroy {
    appId: number;
    address: string;
    message: string;
    sub: any;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private webhookSettingService: WebhookSettingService) {
    }

    ngOnInit() {
        // 获取父路由变量
        this.sub = this.router.routerState.parent(this.route).params.subscribe(params => {
            this.appId = +params['id'];
            this.getAddress();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    
    getAddress() {
        this.webhookSettingService.getAddress(this.appId).subscribe(
            address => this.address = address,
            error => this.message = <any>error);

    }

    saveAddress() {
        this.webhookSettingService.saveAddress(this.appId, this.address).subscribe(
            () => this.message = '保存成功',
            error =>  this.message = <any>error);
    }
}
