import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {UploadService, ToastService, UserModel} from '../../shared/services';
import {ProfileService} from '../shared';


@Component({
    templateUrl: './pwd-reset.component.html',
    styleUrls: ['./pwd-reset.component.css'],
    providers: [ProfileService]
})
export class PwdResetComponent implements OnInit {
    message: string;
    
    oldPassword: string;
    newPassword: string;
    newPassword2: string;

    constructor(private profileService: ProfileService,
                private toastService: ToastService) {
    }

    ngOnInit() {
    }

    resetPassword() {
        this.profileService.resetPassword(this.oldPassword, this.newPassword).subscribe(
            () => {
                this.message = '重置成功';
                this.toastService.triggerToast('提示', this.message, 'success');
            },
            error => {throw error});
    }
}
