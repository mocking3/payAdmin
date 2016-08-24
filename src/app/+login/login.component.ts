import { Component } from '@angular/core';
import { Router }      from '@angular/router';

import { ToastService } from '../shared/toast';
import { AuthService } from '../shared/auth';
import {LoginModel} from './shared';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    message: string;
    model: LoginModel = new LoginModel();

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
}
