import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-profile-left-menu',
    template: `
        <div class="epay_left">
			<div class="epay_homepage">
			    <a routerLink="today-analysis">
				    <p class="epay_homepage_title"><span></span>我的信息</p>
				</a>
			</div>
			<div class="order_manage">
				<p class="order_manage_title"><span></span>渠道配置</p>
				<div class="order_manage_min">
					<p>线上订单</p>
					<p>退款订单</p>
				</div>
			</div>
			<div class="data_analysis">
				<p class="data_analysis_title"><span></span>数据分析</p>
				<div class="data_analysis_min">
					<p>收入总计</p>
					<p>订单总计</p>
					<p>渠道总计</p>
				</div>
			</div>
			<div class="app_setting">
				<p class="app_setting_title"><span></span>应用设置</p>
				<div class="app_setting_min">
					<p>渠道选择</p>
					<p><a routerLink="webhook-setting">webhook</a></p>
				</div>
			</div>
		</div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class ProfileLeftMenuComponent {
}