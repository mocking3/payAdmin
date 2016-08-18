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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/share');
var constants_1 = require('../constants');
var UploadService = (function () {
    function UploadService() {
        var _this = this;
        this.url = constants_1.SERVER_URL + '/fileUpload';
        this.progress = 0;
        this.progress$ = Observable_1.Observable.create(function (observer) {
            _this.progressObserver = observer;
        }).share();
    }
    UploadService.prototype.getObserver = function () {
        return this.progress$;
    };
    UploadService.prototype.upload = function (file) {
        var _this = this;
        var url = this.url;
        return Observable_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            // xhr.setRequestHeader('authorization', '');
            formData.append("file", file, file.name);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var body = JSON.parse(xhr.response);
                        if (body && body.code) {
                            var errMsg = body.msg ? body.msg + "[" + body.code + "]" : '系统异常';
                            observer.error(errMsg);
                        }
                        else {
                            observer.next(body.url);
                            observer.complete();
                        }
                    }
                    else {
                        observer.error(xhr.status + "-" + xhr.statusText);
                    }
                }
            };
            // UploadService.setUploadUpdateInterval(500);
            xhr.upload.onprogress = function (event) {
                _this.progress = Math.round(event.loaded / event.total * 100);
                _this.progressObserver.next(_this.progress);
            };
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    };
    UploadService.setUploadUpdateInterval = function (interval) {
        setInterval(function () {
        }, interval);
    };
    UploadService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UploadService);
    return UploadService;
}());
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map