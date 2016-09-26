import { Component, OnDestroy } from '@angular/core';
import { Router }      from '@angular/router';

import { ToastService, MessageService } from '../shared/services';
import {PwdForgetModel, PwdForgetService} from './shared';

@Component({
    templateUrl: './pwd-forget.component.html',
    styleUrls: ['./pwd-forget.component.css'],
    providers: [PwdForgetService]
})
export class PwdForgetComponent implements OnDestroy {
    message: string;

    pwdStrong:number = 0;

    mwait: number = 0;
    model: PwdForgetModel = new PwdForgetModel();

    constructor(public pwdForgetService: PwdForgetService,
                public router: Router,
                public toastService: ToastService,
                public messageService: MessageService) {
    }

    ngOnDestroy() {
        console.log('destory...');
        this.mwait = 0;
    }

    onSubmit() {
        // this.toastService.triggerToast('提示', this.message, 'wait');
        this.pwdForgetService.resetPwd(this.model).subscribe(data => {
            this.message = `重置成功`;
            this.toastService.triggerToast('提示', this.message, 'success');
            this.router.navigate(['/login']);
        }, error =>  {throw error});
    }

    sendCode() {
        if (this.mwait > 0)
            return;
        if (!this.model.mobile || !this.model.mobile.match(/^((13[0-9])|(14[5,7])|(15[^4,\D])|(17[6-8])|(18[0-9]))\d{8}$/)) {
            this.toastService.triggerToast('提示', '无效的手机号', 'error');
            return;
        }
        this.mwait = 120;
        let arg = this;
        let int = setInterval(function () {
            if (--arg.mwait == 0) {
                clearInterval(int);
            }
            console.log(arg.mwait);
        }, 1000);
        this.messageService.sendCode(this.model.mobile, 'passwordForget').subscribe(
            () => {
                this.message = '发送成功';
                this.toastService.triggerToast('提示', this.message, 'success');
            },
            error => {throw error});
    }

    checkPwdStrong() {
        let sValue:string = this.model.password;
        if (sValue.length < 6 || sValue.length > 30) {
            this.pwdStrong = 0;
            return;
        }
        let modes = 0;
        if (/\d/.test(sValue)) modes++; //数字
        if (/[a-z]/.test(sValue)) modes++; //小写
        if (/[A-Z]/.test(sValue)) modes++; //大写
        if (/\W/.test(sValue)) modes++; //特殊字符

        switch (modes) {
            case 1:
                this.pwdStrong = 1;
                break;
            case 2:
                this.pwdStrong = 2;
                break;
            case 3:
            case 4:
                sValue.length < 12 ? this.pwdStrong = 3 : this.pwdStrong = 4;
                break;
        }
    }
}
