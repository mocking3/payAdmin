import { Component, OnInit } from '@angular/core';
import {WebhookSettingService} from "./webhook-setting.service";
@Component({
    template: `
        {{errorMessage}}
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
export class WebhookSettingComponent implements OnInit {
    address: string;
    errorMessage: string;

    constructor(private webhookSettingService: WebhookSettingService) {
    }

    ngOnInit() {
        this.getAddress();
    }
    
    getAddress() {
        this.webhookSettingService.getAddress(1).subscribe(
            address => this.address = address,
            error => this.errorMessage = <any>error);

    }

    saveAddress() {
        // this.webhookSettingService.saveAddress(this.address).subscribe(
        //     error =>  this.errorMessage = <any>error);
    }
}
