"use strict";
var _login_1 = require('./+login');
var _applications_1 = require('./+applications');
var application_1 = require('./+applications/application');
var channel_setting_1 = require('./+applications/application/settings/channel-setting');
var webhook_setting_1 = require('./+applications/application/settings/webhook-setting');
var analysis_1 = require('./+applications/application/analysis');
var orders_1 = require('./+applications/application/orders');
var shared_1 = require('./shared');
var auth_1 = require('./shared/auth');
exports.routes = [
    { path: '', redirectTo: 'apps', pathMatch: 'full' },
    { path: 'login', component: _login_1.LoginComponent },
    { path: 'apps', component: _applications_1.ApplicationListComponent, canActivate: [auth_1.AuthGuard] },
    { path: 'apps/:id', component: application_1.ApplicationComponent, canActivate: [auth_1.AuthGuard], children: [
            { path: '', component: analysis_1.TodayAnalysisComponent },
            { path: 'today-analysis', component: analysis_1.TodayAnalysisComponent },
            { path: 'detail', component: application_1.ApplicationDetailComponent },
            { path: 'orders', component: orders_1.OrderComponent },
            { path: 'channel-setting', component: channel_setting_1.ChannelSettingComponent },
            { path: 'webhook-setting', component: webhook_setting_1.WebhookSettingComponent },
        ] },
    { path: '**', component: shared_1.PageNotFoundComponent }
];
//# sourceMappingURL=app.routes.js.map