"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var header_component_1 = require('../inc/header.component');
var app_left_menu_component_1 = require('../inc/app-left-menu.component');
var ApplicationComponent = (function () {
    function ApplicationComponent() {
    }
    ApplicationComponent = __decorate([
        core_1.Component({
            template: "\n        <div class=\"epay\">\n            <my-header></my-header>\n            <div class=\"epay_con clearfix\">\n                <my-app-left-menu></my-app-left-menu>\n                <div class=\"epay_right\">\n                    <router-outlet></router-outlet>\n                </div>\n            </div>\n        </div>\n    ",
            directives: [router_1.ROUTER_DIRECTIVES, header_component_1.HeaderComponent, app_left_menu_component_1.AppLeftMenuComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], ApplicationComponent);
    return ApplicationComponent;
}());
exports.ApplicationComponent = ApplicationComponent;
//# sourceMappingURL=application.component.js.map