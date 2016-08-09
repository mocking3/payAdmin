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
var auth_service_1 = require('./auth.service');
var Login_1 = require("./model/Login");
var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.model = new Login_1.LoginModel();
    }
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.message = 'Trying to log in ...';
        this.authService.login(this.model.username, this.model.password).subscribe(function () {
            if (_this.authService.isLoggedIn()) {
                var redirect = _this.authService.redirectUrl ? _this.authService.redirectUrl : '/apps';
                _this.router.navigate([redirect]);
            }
        }, function (error) { return _this.message = error; });
    };
    LoginComponent = __decorate([
        core_1.Component({
            template: "\n        <!-- \u767B\u5F55 -->\n        <h1>{{message}}</h1>\n        <div class=\"login\">\n            <form (ngSubmit)=\"onSubmit()\" #loginForm=\"ngForm\">\n                <div class=\"login_con\">\n                    <p class=\"login_title\">\u767B\u5F55</p>\n                    <div class=\"login_name\">\n                        <span></span>\n                        <input type=\"text\" required [(ngModel)]=\"model.username\" name=\"username\" #username=\"ngModel\" />\n                        <div [hidden]=\"username.valid || username.pristine\">\u7528\u6237\u540D\u5FC5\u586B</div>\n                    </div>\n                    <div class=\"login_password\">\n                        <span></span>\n                        <input type=\"password\" required [(ngModel)]=\"model.password\" name=\"password\" #password=\"ngModel\"/>\n                        <div [hidden]=\"password.valid || password.pristine\">\u5BC6\u7801\u5FC5\u586B</div>\n                    </div>\n                    <button type=\"submit\" class=\"login_btn\" [disabled]=\"!loginForm.form.valid\">\u767B\u5F55</button>\n                </div>\t\n            </form>\n        </div>\n    ",
            styleUrls: ['./login.component.css']
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map