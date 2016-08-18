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
var AppLeftMenuComponent = (function () {
    function AppLeftMenuComponent() {
    }
    AppLeftMenuComponent = __decorate([
        core_1.Component({
            selector: 'my-app-left-menu',
            templateUrl: './app-left-menu.component.html',
            styleUrls: ['./app-left-menu.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], AppLeftMenuComponent);
    return AppLeftMenuComponent;
}());
exports.AppLeftMenuComponent = AppLeftMenuComponent;
//# sourceMappingURL=app-left-menu.component.js.map