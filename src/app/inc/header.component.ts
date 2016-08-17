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
    `,
    styles: [`
        .epay_head{
            width: 100%;
            height: 78px;
            border-bottom: 1px solid #edf1fa;
        }
        .epay_logo{
            float: left;
            width: 14%;
            height: 100%;
            border-right: 1px solid #edf1fa;
            text-align: center;
            font-size: 12px;
            line-height: 78px;
            color: #3088ef;
        }
        .epay_head_list{
            float: right;
            width: 85.9%;
            height: 100%;
        }
        .epay_search{
            float: right;
            width: 380px;
            height: 40px;
            border: 1px solid #edf1fa;
            background-color: #fafbfe;
            margin-top: 20px;
            border-radius: 5px;
        }
        .epay_search span{
            display: block;
            float: left;
            height: 25px;
            width: 25px;
            background: url("/public/images/sprite.png") no-repeat;
            background-position: 0 -251px;
            margin-top: 7px;
            margin-left: 10px;
        }
        .epay_search input{
            display: block;
            float: left;
            height: 40px;
            outline: none;
            border: 0;
            width: 340px;
            background-color: transparent;
        }
        .epay_search_btn{
            float: right;
            width: 70px;
            height: 25px;
            border-radius: 3px;
            font-size: 14px;
            line-height: 25px;
            color: #ffffff;
            text-align: center;
            background-color: #1997ea;
            margin-top: 28px;
            margin-left: 14px;
        }
        .go_back_list{
            float: right;
            // width: 72px;
            height: 34px;
            font-size: 18px;
            line-height: 34px;
            color: #8296ca;
            padding-left: 45px;
            margin-top: 22px;
            margin-left: 12px;
            border-left: 1px solid #eef1f9;
            position: relative;
        }
        .go_back_list span{
            display: block;
            position: absolute;
            left: 13px;
            top: 6px;
            width: 25px;
            height: 25px;
            background: url("/public/images/sprite.png") no-repeat;
            background-position: 0 -229px;
        }
        .account_center{
            float: right;
            // width: 72px;
            height: 34px;
            font-size: 18px;
            line-height: 34px;
            color: #8296ca;
            padding-left: 45px;
            margin-top: 22px;
            margin-left: 12px;
            border-left: 1px solid #eef1f9;
            position: relative;
        }
        .account_center span{
            display: block;
            position: absolute;
            left: 13px;
            top: 6px;
            width: 25px;
            height: 25px;
            background: url("/public/images/sprite.png") no-repeat;
            background-position: 0 -276px;
        }
        .go_back{
            float: right;
            // width: 72px;
            height: 34px;
            font-size: 18px;
            line-height: 34px;
            color: #8296ca;
            padding-left: 13px;
            margin-top: 22px;
            margin-left: 12px;
            border-left: 1px solid #eef1f9;
            margin-right: 30px;
        }
        .epay_con{
            width: 100%;
        }
    `]
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