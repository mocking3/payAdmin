import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {ToastService} from '../../../shared/toast';

import {ClipboardDirective} from '../../../shared/directives';
import {UploadService} from '../../../shared/upload';
import {ApplicationService, ApplicationModel} from '../../shared';

@Component({
    templateUrl: './application-detail.component.html',
    styleUrls: ['./application-detail.component.css'],
    providers: [ApplicationService],
    directives: [ClipboardDirective]
})
export class ApplicationDetailComponent implements OnInit, OnDestroy {
    appId: number;
    message: string;
    application: ApplicationModel = new ApplicationModel();
    uploadProgress: number;
    sub: any;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private applicationService: ApplicationService,
                private uploadService: UploadService,
                private toastService: ToastService) {
    }

    ngOnInit() {
        // 获取父路由变量
        this.sub = this.router.routerState.parent(this.route).params.subscribe(params => {
            this.appId = +params['id'];
            this.getApplication();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getApplication() {
        this.applicationService.getApplication(this.appId).subscribe(
            data => this.application = data,
            error => {throw error});
    }


    updateApp() {
        this.applicationService.updateApplication(this.application.id, this.application.name, this.application.logo).subscribe(
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
            url => this.application.logo = url,
            error => {throw error}
        );
    }
}
