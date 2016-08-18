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
var shared_1 = require('./shared');
var WebhookSettingComponent = (function () {
    function WebhookSettingComponent(router, route, webhookSettingService) {
        this.router = router;
        this.route = route;
        this.webhookSettingService = webhookSettingService;
    }
    WebhookSettingComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 获取父路由变量
        this.sub = this.router.routerState.parent(this.route).params.subscribe(function (params) {
            _this.appId = +params['id'];
            _this.getAddress();
        });
    };
    WebhookSettingComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    WebhookSettingComponent.prototype.getAddress = function () {
        var _this = this;
        this.webhookSettingService.getAddress(this.appId).subscribe(function (address) { return _this.address = address; }, function (error) { return _this.message = error; });
    };
    WebhookSettingComponent.prototype.saveAddress = function () {
        var _this = this;
        this.webhookSettingService.saveAddress(this.appId, this.address).subscribe(function () { return _this.message = '保存成功'; }, function (error) { return _this.message = error; });
    };
    WebhookSettingComponent = __decorate([
        core_1.Component({
            templateUrl: './webhook-setting.component.html',
            styleUrls: ['./webhook-setting.component.css'],
            providers: [shared_1.WebhookSettingService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, shared_1.WebhookSettingService])
    ], WebhookSettingComponent);
    return WebhookSettingComponent;
}());
exports.WebhookSettingComponent = WebhookSettingComponent;
//# sourceMappingURL=webhook-setting.component.js.map