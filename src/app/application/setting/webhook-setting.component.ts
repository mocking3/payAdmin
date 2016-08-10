import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {WebhookSettingService} from "./webhook-setting.service";
@Component({
    template: `
        {{message}}
        <!-- webhook -->
        <div class="usual_setting">
            <p class="drawback_order_title">webhook设置</p>
            <ul class="usual_setting_list">
                <li>
                    <p class="list_name">地址</p>
                    <input type="text" [(ngModel)]="address">
                </li>
            </ul>
            <p (click)="saveAddress()" class="list_sure_btn">保存</p>
        </div>
    `,
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
