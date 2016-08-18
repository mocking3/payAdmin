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
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var BaseService = (function () {
    function BaseService() {
    }
    BaseService.prototype.extractData = function (res) {
        var body = res.json() || {};
        // 如果返回错误
        if (body && body.code) {
            var errMsg = body.msg ? body.msg + "[" + body.code + "]" : '系统异常';
            throw new Error(errMsg);
        }
        return body;
    };
    BaseService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : '系统异常';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    BaseService.prototype.getHeaders = function () {
        return new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    };
    BaseService.prototype.getAuthHeaders = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        headers.set('authorization', this.getToken());
        return headers;
    };
    BaseService.prototype.setToken = function (token) {
        this.token = token;
        localStorage.setItem('token', this.token);
    };
    BaseService.prototype.removeToken = function () {
        this.token = null;
        localStorage.removeItem('token');
    };
    BaseService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    BaseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BaseService);
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map