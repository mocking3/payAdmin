import { Component } from '@angular/core';
import { Router }      from '@angular/router';

import { ToastService, AuthService } from '../shared/services';
import {LoginModel} from './shared';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    message: string;
    model: LoginModel = new LoginModel();

    showQrCode: boolean = false;
    qrCodeUrl: string;

    constructor(public authService: AuthService,
                public router: Router,
                public toastService: ToastService) {
    }

    onSubmit() {
        this.message = '登录中...';
        // this.toastService.triggerToast('提示', this.message, 'wait');
        this.authService.login(this.model.username, this.model.password).subscribe(data => {
            if (this.authService.isLoggedIn()) {
                this.message = `登录成功，欢迎${data.nickname}`;
                this.toastService.triggerToast('提示', this.message, 'success');
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/apps';
                this.router.navigate([redirect]);
            }
        }, error =>  {throw error});
    }

    getQrCode() {
        this.authService.getQrCode().subscribe(data => {
            this.qrCodeUrl = data.qrCodeUrl;
            this.showQrCode = true;
            let arg = this;
            let interval = setInterval(function () {
                // 如果没过期
                if (arg.showQrCode && new Date().getTime() - data.createTime < 5 * 60 * 1000) {
                    arg.authService.scanLogin(data.text).subscribe(data2 => {
                        if (data2 && arg.authService.isLoggedIn()) {
                            this.showQrCode = false;
                            clearInterval(interval);

                            arg.message = `登录成功，欢迎${data2.nickname}`;
                            arg.toastService.triggerToast('提示', arg.message, 'success');
                            let redirect = arg.authService.redirectUrl ? arg.authService.redirectUrl : '/apps';
                            arg.router.navigate([redirect]);
                        }
                    }, error2 =>  {throw error2});
                } else {
                    console.log('二维码已关闭或已过期');
                    clearInterval(interval);
                }
            }, 800);
        }, error =>  {throw error});
    }



    cancel() {
        this.showQrCode = false;
    }
}
