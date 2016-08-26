import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';

import {ToastService, UploadService, UserModel} from '../../shared/services';
import {ProfileService} from '../shared';

@Component({
    templateUrl: './profile-base.component.html',
    styleUrls: ['./profile-base.component.css'],
    providers: [ProfileService],
    directives: [ROUTER_DIRECTIVES]
})
export class ProfileBaseComponent implements OnInit {
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
        this.profileService.getProfile().subscribe(
            data => this.profile = data,
            error => {throw error});
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
