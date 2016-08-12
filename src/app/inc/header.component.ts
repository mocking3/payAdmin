import {Component} from '@angular/core';
import { Router }      from '@angular/router';

import {AuthService} from "../auth.service";

@Component({
    selector: 'my-header',
    template: `
        <div class="epay_head clearfix">
            <p class="epay_logo"><span></span>网易支付中心</p>
            <div class="epay_head_list clearfix">
                <p class="go_back" (click)="logout()" >退出登录</p>
                <p class="account_center"><span></span>账户中心</p>
                <p *ngIf="showAppBack" (click)="goAppList()" class="go_back_list"><span></span>返回列表</p>
                <p *ngIf="showSearch" class="epay_search_btn">查询</p>
                <div *ngIf="showSearch" class="epay_search clearfix">
                    <span></span>
                    <input type="text">
                </div>
            </div>
        </div>
    `
})
export class HeaderComponent {
    message: string;
    showAppBack: boolean = false;
    showSearch: boolean = false;
    constructor(public authService: AuthService, public router: Router) {
    }


    logout() {
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/login']);
        }, error => this.message = <any>error);
    }

    goAppList() {
        this.router.navigate(['/apps']);
    }
}