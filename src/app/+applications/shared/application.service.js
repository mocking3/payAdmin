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
var shared_1 = require('../../shared');
var _1 = require('./');
var ApplicationService = (function (_super) {
    __extends(ApplicationService, _super);
    function ApplicationService(http) {
        _super.call(this);
        this.http = http;
        this.url = shared_1.SERVER_URL + '/apps';
    }
    ApplicationService.prototype.getApplications = function () {
        // this.url = '/api/applications-get.json';
        var headers = this.getAuthHeaders();
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.url, options).map(this.extractData).catch(this.handleError);
    };
    ApplicationService.prototype.createApplication = function (appName, appLogo) {
        // this.url = '/api/webhook-setting-put.json';
        var body = "appName=" + appName + "&appLogo=" + appLogo;
        var headers = this.getAuthHeaders();
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url, body, options)
            .map(this.extractData).map(function (data) {
            var application = new _1.ApplicationModel();
            application.id = data.id;
            application.appKey = data.appKey;
            application.name = appName;
            application.logo = appLogo;
            application.createTime = new Date().getTime();
            return application;
        })
            .catch(this.handleError);
    };
    ApplicationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ApplicationService);
    return ApplicationService;
}(shared_1.BaseService));
exports.ApplicationService = ApplicationService;
//# sourceMappingURL=application.service.js.map