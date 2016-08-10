import {Component,OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HeaderComponent} from "../inc/header.component";
import {ApplicationService} from "./application.service";
import {ApplicationModel} from "../model/Application";

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

    constructor(private applicationService: ApplicationService) {
    }

    ngOnInit() {
        this.applicationService.getApplications().subscribe(
            data => this.applications = data.data,
            error => this.message = <any>error);
    }

    createApp() {
        
    }
    
}
