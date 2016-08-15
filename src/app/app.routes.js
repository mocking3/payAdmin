"use strict";
var login_component_ts_1 = require('./login.component.ts');
var application_component_1 = require("./application/application.component");
var auth_guard_service_1 = require("./auth.guard.service");
var application_list_component_1 = require("./application/application-list.component");
var application_detail_component_1 = require("./application/application-detail.component");
var channel_setting_component_1 = require("./application/setting/channel-setting.component");
var webhook_setting_component_1 = require("./application/setting/webhook-setting.component");
var today_analysis_component_1 = require("./application/analysis/today-analysis.component");
var page_not_found_component_1 = require("./page-not-found.component");
var order_component_1 = require("./application/order/order.component");
exports.routes = [
    { path: '', redirectTo: 'apps', pathMatch: 'full' },
    { path: 'login', component: login_component_ts_1.LoginComponent },
    { path: 'apps', component: application_list_component_1.ApplicationListComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'apps/:id', component: application_component_1.ApplicationComponent, canActivate: [auth_guard_service_1.AuthGuard], children: [
            { path: '', component: today_analysis_component_1.TodayAnalysisComponent },
            { path: 'today-analysis', component: today_analysis_component_1.TodayAnalysisComponent },
            { path: 'detail', component: application_detail_component_1.ApplicationDetailComponent },
            { path: 'orders', component: order_component_1.OrderComponent },
            { path: 'channel-setting', component: channel_setting_component_1.ChannelSettingComponent },
            { path: 'webhook-setting', component: webhook_setting_component_1.WebhookSettingComponent },
        ] },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
];
//# sourceMappingURL=app.routes.js.map