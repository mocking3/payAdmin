"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var app_component_1 = require('./app/app.component');
var app_routes_1 = require('./app/app.routes');
if (process.env.ENV === 'production') {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    app_routes_1.appRouterProviders
]).catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map