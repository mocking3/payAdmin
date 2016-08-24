import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {ToastService} from '../../shared/toast';

import {ProfileService} from './shared';
import {UserModel} from '../../shared/auth/user.model';
import {UploadService} from '../../shared/upload';

@Component({
    templateUrl: './profile-detail.component.html',
    styleUrls: ['./profile-detail.component.css'],
    providers: [ProfileService]
})
export class ProfileDetailComponent implements OnInit {
    appId: number;
    message: string;
    profile: UserModel = new UserModel();
    uploadProgress: number;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private profileService: ProfileService,
                private uploadService: UploadService,
                private toastService: ToastService) {
    }

    ngOnInit() {
        this.getProfile();
    }

    getProfile() {
        // 直接从本地取
        this.profile = this.profileService.getCurrentUser();
    }


    updateProfile() {
        this.profileService.updateProfile(this.profile.nickname, this.profile.headIcoUrl).subscribe(
            () => {
                this.message = '保存成功';
                this.toastService.triggerToast('提示', this.message, 'success');
            },
            error => {throw error});
    }

    upload($event: any) {
        this.uploadService.getObserver().subscribe(progress =>  {
            this.uploadProgress = progress;
            console.log(progress);
        });
        this.uploadService.upload($event.target.files[0]).subscribe(
            url => this.profile.headIcoUrl = url,
            error => {throw error}
        );
    }
}
