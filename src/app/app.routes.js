"use strict";
var router_1 = require('@angular/router');
var login_component_ts_1 = require('./login.component.ts');
var application_component_1 = require("./application/application.component");
var auth_guard_1 = require("./auth.guard");
var auth_service_1 = require("./auth.service");
var routes = [
    { path: 'login', component: login_component_ts_1.LoginComponent },
    { path: 'apps', component: application_component_1.ApplicationComponent, canActivate: [auth_guard_1.AuthGuard] }
];
exports.appRouterProviders = [
    router_1.provideRouter(routes),
    auth_guard_1.AuthGuard,
    auth_service_1.AuthService
];
//# sourceMappingURL=app.routes.js.map