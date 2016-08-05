import { Component } from '@angular/core';
import { Router }      from '@angular/router';

import { AuthService } from './auth.service';
import {LoginModel} from "./model/Login";

@Component({
    template: `
        <!-- 登录 -->
        <h1>{{message}}</h1>
        <div class="login">
            <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
                <div class="login_con">
                    <p class="login_title">登录</p>
                    <div class="login_name">
                        <span></span>
                        <input type="text" required [(ngModel)]="model.username" name="username" #username="ngModel" />
                        <div [hidden]="username.valid || username.pristine">用户名必填</div>
                    </div>
                    <div class="login_password">
                        <span></span>
                        <input type="password" required [(ngModel)]="model.password" name="password" #password="ngModel"/>
                        <div [hidden]="password.valid || password.pristine">密码必填</div>
                    </div>
                    <button type="submit" class="login_btn" [disabled]="!loginForm.form.valid">登录</button>
                </div>	
            </form>
        </div>
    `,
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    message: string;
    model: LoginModel = new LoginModel();

    constructor(public authService: AuthService, public router: Router) {
    }

    onSubmit() {
        this.message = 'Trying to log in ...';
        this.authService.login(this.model.username, this.model.password).subscribe(() => {
            if (this.authService.isLoggedIn) {
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/apps';
                this.router.navigate([redirect]);
            }
        });
    }
}
