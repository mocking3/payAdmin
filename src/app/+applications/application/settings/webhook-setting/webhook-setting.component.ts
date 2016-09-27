import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {ToastService} from '../../../../shared/services';

import {WebhookSettingService} from './shared';
@Component({
    templateUrl: './webhook-setting.component.html',
    styleUrls: ['./webhook-setting.component.css'],
    providers: [WebhookSettingService]
})
export class WebhookSettingComponent implements OnInit, OnDestroy {
    appId: number;
    address: string;
    message: string;
    

    constructor(private route: ActivatedRoute,
                private webhookSettingService: WebhookSettingService,
                private toastService:ToastService) {
    }

    ngOnInit() {
        // 获取父路由变量
        this.route.parent.params.subscribe(params => {
            this.appId = +params['id'];
            this.getAddress();
        });
    }

    ngOnDestroy() {
        
    }
    
    getAddress() {
        this.webhookSettingService.getAddress(this.appId).subscribe(
            address => this.address = address,
            error => {throw error});

    }

    saveAddress() {
        this.webhookSettingService.saveAddress(this.appId, this.address).subscribe(
            () => {
                this.message = '保存成功';
                this.toastService.triggerToast('提示', this.message, 'success');
            },
            error => {throw error});
    }
}
