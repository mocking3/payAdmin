"use strict";
var router_1 = require('@angular/router');
var login_component_ts_1 = require('./login.component.ts');
var application_component_1 = require("./application/application.component");
var auth_guard_service_1 = require("./auth.guard.service");
var auth_service_1 = require("./auth.service");
var application_list_component_1 = require("./application/application-list.component");
var application_detail_component_1 = require("./application/application-detail.component");
var channel_setting_component_1 = require("./application/setting/channel-setting.component");
var webhook_setting_component_1 = require("./application/setting/webhook-setting.component");
var today_analysis_component_1 = require("./application/analysis/today-analysis.component");
var page_not_found_component_1 = require("./page-not-found.component");
var authProviders = [auth_guard_service_1.AuthGuard, auth_service_1.AuthService];
var routes = [
    { path: '', redirectTo: 'apps', pathMatch: 'full' },
    { path: 'login', component: login_component_ts_1.LoginComponent },
    { path: 'apps', component: application_list_component_1.ApplicationListComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'apps/:id', component: application_component_1.ApplicationComponent, canActivate: [auth_guard_service_1.AuthGuard], children: [
            { path: '', component: today_analysis_component_1.TodayAnalysisComponent },
            { path: 'detail', component: application_detail_component_1.ApplicationDetailComponent },
            { path: 'channel-setting', component: channel_setting_component_1.ChannelSettingComponent },
            { path: 'webhook-setting', component: webhook_setting_component_1.WebhookSettingComponent },
        ] },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes),
    authProviders
];
//# sourceMappingURL=app.routes.js.map