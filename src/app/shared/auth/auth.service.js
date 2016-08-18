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
var base_service_ts_1 = require('../base.service.ts');
var constants_ts_1 = require('../constants.ts');
var AuthService = (function (_super) {
    __extends(AuthService, _super);
    function AuthService(http) {
        _super.call(this);
        this.http = http;
        this.url = constants_ts_1.SERVER_URL + '/session';
    }
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        // let body = { username: username, password: password};
        var body = 'username=' + username + '&password=' + password;
        var options = new http_1.RequestOptions({ headers: this.getHeaders() });
        return this.http.post(this.url, body, options)
            .map(this.extractData).map(function (data) {
            _this.setToken(data.authorization);
        }).catch(this.handleError);
    };
    AuthService.prototype.isLoggedIn = function () {
        return !!this.getToken();
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        var options = new http_1.RequestOptions({ headers: this.getAuthHeaders() });
        return this.http.delete(this.url, options).map(this.extractData).map(function () {
            _this.removeToken();
        }).catch(this.handleError);
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthService);
    return AuthService;
}(base_service_ts_1.BaseService));
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map