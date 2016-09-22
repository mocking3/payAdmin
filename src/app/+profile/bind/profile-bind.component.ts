import { Component, OnInit } from '@angular/core';

import {ToastService,MessageService, UserModel} from '../../shared/services';
import {ProfileService} from '../shared';

@Component({
    templateUrl: './profile-bind.component.html',
    styleUrls: ['./profile-bind.component.css'],
    providers: [ProfileService]
})
export class ProfileBindComponent implements OnInit {
    message: string;
    profile: UserModel = new UserModel();

    mobile: string;
    mcode: string;
    mwait:number = 0;

    email: string;
    ecode: string;
    ewait:number = 0;

    constructor(private profileService: ProfileService,
                private toastService: ToastService,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.profileService.getProfile().subscribe(
            data => this.profile = data,
            error => {throw error});
    }

    changeMobile() {
        this.profileService.changeMobile(this.mobile, this.mcode).subscribe(
            () => {
                this.profile.mobile = this.mobile;
                this.message = '更换成功';
                this.toastService.triggerToast('提示', this.message, 'success');
            },
            error => {throw error});
    }

    changeEmail() {
        this.profileService.changeEmail(this.email, this.ecode).subscribe(
            () => {
                this.profile.email = this.email;
                this.message = '更换成功';
                this.toastService.triggerToast('提示', this.message, 'success');
            },
            error => {throw error});
    }
    
    sendMobileCode() {
        if (this.mwait > 0)
            return;
        if (!this.mobile || !this.mobile.match(/^((13[0-9])|(14[5,7])|(15[^4,\D])|(17[6-8])|(18[0-9]))\d{8}$/)) {
            this.toastService.triggerToast('提示', '无效的手机号', 'error');
            return;
        }
        this.mwait = 60;
        let arg = this;
        var int = setInterval(function () {
            if (--arg.mwait == 0) {
                clearInterval(int);
            }
            console.log(arg.mwait);
        }, 1000);
        this.messageService.sendCode(this.mobile, 'mobileBind').subscribe(
            () => {
                this.message = '发送成功';
                this.toastService.triggerToast('提示', this.message, 'success');
            },
            error => {throw error});
    }

    sendEmailCode() {
        if (this.ewait > 0)
            return;
        if (!this.email || !this.email.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)) {
            this.toastService.triggerToast('提示', '无效的邮箱', 'error');
            return;
        }
        this.ewait = 60;
        let arg = this;
        var int = setInterval(function () {
            if (--arg.ewait == 0) {
                clearInterval(int);
            }
            console.log(arg.ewait);
        }, 1000);
        this.messageService.sendCode(this.email, 'emailBind').subscribe(
            () => {
                this.message = '发送成功';
                this.toastService.triggerToast('提示', this.message, 'success');
            },
            error => {throw error});
    }
    
    
    
}
