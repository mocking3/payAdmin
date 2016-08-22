import {Component,OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HeaderComponent} from '../shared/header';
import {UploadService} from '../shared/upload';
import {ApplicationService, ApplicationModel} from './shared';

@Component({
    templateUrl: './application-list.component.html',
    styleUrls: ['./application-list.component.css'],
    providers: [ApplicationService],
    directives: [ROUTER_DIRECTIVES, HeaderComponent]
})
export class ApplicationListComponent implements OnInit {
    message: string;
    applications: ApplicationModel[];
    // 是否显示新建弹出框
    showAdd: boolean = false;

    application: ApplicationModel = new ApplicationModel();

    uploadProgress: number;

    constructor(private applicationService: ApplicationService, private uploadService: UploadService) {
    }

    ngOnInit() {
        this.applicationService.getApplications().subscribe(
            data => this.applications = data.data,
            error => this.message = <any>error);
    }
    
    createApp() {
        this.applicationService.createApplication(this.application.name, this.application.logo).subscribe(
            data => {
                this.application = new ApplicationModel();
                this.showAdd = false;
                this.applications.push(data);
            },
            error => this.message = <any>error);
    }

    cancal() {
        this.application = new ApplicationModel();
        this.showAdd = false;
    }


    upload($event: any) {
        this.uploadService.getObserver().subscribe(progress =>  {
            this.uploadProgress = progress;
            console.log(progress);
        });
        this.uploadService.upload($event.target.files[0]).subscribe(
            url => this.application.logo = url,
            error => this.message = <any>error
        );
    }
}
