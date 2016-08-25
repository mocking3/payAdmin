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

    email: string;
    ecode: string;

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
                this.message = '更换成功';
                this.toastService.triggerToast('提示', this.message, 'success');
            },
            error => {throw error});
    }

    changeEmail() {
        this.profileService.changeEmail(this.email, this.ecode).subscribe(
            () => {
                this.message = '更换成功';
                this.toastService.triggerToast('提示', this.message, 'success');
            },
            error => {throw error});
    }
    
    sendMobileCode() {
        this.messageService.sendCode('mobile', 'bind').subscribe(
            () => {
                this.message = '发送成功';
                this.toastService.triggerToast('提示', this.message, 'success');
            },
            error => {throw error});
    }

    sendEmailCode() {
        this.messageService.sendCode('email', 'bind').subscribe(
            () => {
                this.message = '发送成功';
                this.toastService.triggerToast('提示', this.message, 'success');
            },
            error => {throw error});
    }
    
}
