"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var http_1 = require('@angular/http');
var base_service_1 = require("../../base.service");
var app_constants_1 = require("../../app.constants");
var OrderService = (function (_super) {
    __extends(OrderService, _super);
    function OrderService(http) {
        _super.call(this);
        this.http = http;
        this.url = app_constants_1.SERVER_URL + '/apps/${appId}/orders';
    }
    OrderService.prototype.getOrders = function (appId, orderTimeBegin, orderTimeEnd, channel, outTradeNo, pageNum, pageSize) {
        var url = this.url.replace(new RegExp('\\$\\{appId\\}', 'g'), appId + '') +
            ("?orderTimeBegin=" + orderTimeBegin + "&orderTimeEnd=" + orderTimeEnd + "&channel=" + channel + "&outTradeNo=" + outTradeNo + "&pageNum=" + pageNum + "&pageSize=" + pageSize);
        // this.url = '/api/webhook-setting-get.json';
        var headers = this.getAuthHeaders();
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(url, options).map(this.extractData).catch(this.handleError);
    };
    OrderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], OrderService);
    return OrderService;
}(base_service_1.BaseService));
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map