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
			<div class="app_setting">
				<p class="app_setting_title"><span></span>渠道设置</p>
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