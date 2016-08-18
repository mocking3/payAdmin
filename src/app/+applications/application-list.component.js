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
var header_1 = require('../shared/header');
var upload_1 = require('../shared/upload');
var shared_1 = require('./shared');
var ApplicationListComponent = (function () {
    function ApplicationListComponent(applicationService, uploadService) {
        this.applicationService = applicationService;
        this.uploadService = uploadService;
        // 是否显示新建弹出框
        this.showAdd = false;
        this.application = new shared_1.ApplicationModel();
    }
    ApplicationListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.applicationService.getApplications().subscribe(function (data) { return _this.applications = data.data; }, function (error) { return _this.message = error; });
    };
    ApplicationListComponent.prototype.upload = function ($event) {
        var _this = this;
        this.uploadService.getObserver().subscribe(function (progress) {
            _this.uploadProgress = progress;
            console.log(progress);
        });
        this.uploadService.upload($event.target.files[0]).subscribe(function (url) { return _this.application.logo = url; }, function (error) { return _this.message = error; });
    };
    ApplicationListComponent.prototype.createApp = function () {
        var _this = this;
        this.applicationService.createApplication(this.application.name, this.application.logo).subscribe(function (data) {
            _this.application = new shared_1.ApplicationModel();
            _this.showAdd = false;
            _this.applications.push(data);
        }, function (error) { return _this.message = error; });
    };
    ApplicationListComponent.prototype.cancal = function () {
        this.application = new shared_1.ApplicationModel();
        this.showAdd = false;
    };
    ApplicationListComponent = __decorate([
        core_1.Component({
            templateUrl: './application-list.component.html',
            styleUrls: ['./application-list.component.css'],
            providers: [shared_1.ApplicationService],
            directives: [router_1.ROUTER_DIRECTIVES, header_1.HeaderComponent]
        }), 
        __metadata('design:paramtypes', [shared_1.ApplicationService, upload_1.UploadService])
    ], ApplicationListComponent);
    return ApplicationListComponent;
}());
exports.ApplicationListComponent = ApplicationListComponent;
//# sourceMappingURL=application-list.component.js.map