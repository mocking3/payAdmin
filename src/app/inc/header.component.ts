import {Component} from '@angular/core';

@Component({
    selector: 'my-header',
    template: `
        <div class="epay_head clearfix">
            <p class="epay_logo"><span></span>网易支付中心</p>
            <div class="epay_head_list clearfix">
                <p class="go_back">退出登录</p>
                <p class="account_center"><span></span>账户中心</p>
                <p class="go_back_list"><span></span>返回列表</p>
                <p class="epay_search_btn">查询</p>
                <div class="epay_search clearfix">
                    <span></span>
                    <input type="text">
                </div>
            </div>
        </div>
    `
})
export class HeaderComponent {
}