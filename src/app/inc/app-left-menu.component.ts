import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-app-left-menu',
    template: `
        <div class="epay_left">
			<div class="epay_homepage">
			    <a routerLink="today-analysis">
				    <p class="epay_homepage_title"><span></span>主页</p>
				</a>
			</div>
			<div class="order_manage">
				<p class="order_manage_title"><span></span>订单管理</p>
				<div class="order_manage_min">
					<p><a routerLink="orders">线上订单</a></p>
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
    styles: [`
        /*左侧导航栏*/
        .epay_left{
            position: absolute;
            float: left;
            width: 14%;
            border-right: 1px solid #edf1fa;
        }
        .epay_homepage{
            width: 100%;
        }
        .epay_homepage_title{
            width: 155px;
            margin: 0 auto;
            padding-left: 30px;
            font-size: 18px;
            line-height: 22px;
            height: 22px;
            color: #354285;
            position: relative;
            margin-top: 30px;
        }
        .epay_homepage_title:hover,
        .data_analysis_title:hover,
        .app_setting_title:hover,
        .order_manage_title:hover{
            color: #4696e4;
            font-weight: bold;
            cursor: pointer;
        }
        .epay_homepage_title span{
            display: block;
            position: absolute;
            left: 0px;
            top: 0px;
            width: 20px;
            height: 20px;
            background: url("/public/images/sprite.png") no-repeat;
            background-position: -39px -192px;
        }
        .order_manage{
            width: 100%;
        }
        .order_manage_title{
            width: 155px;
            margin: 0 auto;
            padding-left: 30px;
            font-size: 18px;
            line-height: 22px;
            height: 22px;
            color: #354285;
            position: relative;
            margin-top: 30px;
        }
        .order_manage_title span{
            display: block;
            position: absolute;
            left: 0px;
            top: 0px;
            width: 20px;
            height: 20px;
            background: url("/public/images/sprite.png") no-repeat;
            background-position: 0 -362px;
        }
        .order_manage_min{
            width: 100%;
        }
        .order_manage_min p{
            width: 100%;
            font-size: 18px;
            line-height: 30px;
            height: 30px;
            color: #616fbc;
            text-align: center;
            margin-top: 15px;
            cursor: pointer;
        }
        .order_manage_min p a{
            color: #616fbc;
        }
        .order_manage_min p:hover{
            background-color: #fafbfe;
            color: #4596e4;
        }
        .data_analysis{
            width: 100%;
        }
        .data_analysis_title{
            width: 155px;
            margin: 0 auto;
            padding-left: 30px;
            font-size: 18px;
            line-height: 22px;
            height: 22px;
            color: #354285;
            position: relative;
            margin-top: 30px;
        }
        .data_analysis_title span{
            display: block;
            position: absolute;
            left: 0px;
            top: 0px;
            width: 20px;
            height: 20px;
            background: url("/public/images/sprite.png") no-repeat;
            background-position: 0 -342px;
        }
        .data_analysis_min{
            width: 100%;
        }
        .data_analysis_min p{
            width: 100%;
            font-size: 18px;
            line-height: 30px;
            height: 30px;
            color: #616fbc;
            text-align: center;
            margin-top: 15px;
            cursor: pointer;
        }
        .data_analysis_min p a{
            color: #616fbc;
        }
        .data_analysis_min p:hover{
            background-color: #fafbfe;
            color: #4596e4;
        }
        .app_setting{
            width: 100%;
        }
        .app_setting_title{
            width: 155px;
            margin: 0 auto;
            padding-left: 30px;
            font-size: 18px;
            line-height: 22px;
            height: 22px;
            color: #354285;
            position: relative;
            margin-top: 30px;
        }
        .app_setting_title span{
            display: block;
            position: absolute;
            left: 0px;
            top: 0px;
            width: 20px;
            height: 20px;
            background: url("/public/images/sprite.png") no-repeat;
            background-position: 0 -304px;
        }
        .app_setting_min{
            width: 100%;
        }
        .app_setting_min p{
            width: 100%;
            font-size: 18px;
            line-height: 30px;
            height: 30px;
            color: #616fbc;
            text-align: center;
            margin-top: 15px;
            cursor: pointer;
        }
        .app_setting_min p a{
            color: #616fbc;
        }
        .app_setting_min p:hover{
            background-color: #fafbfe;
            color: #4596e4;
        }
    `],
    directives: [ROUTER_DIRECTIVES]
})
export class AppLeftMenuComponent {
}