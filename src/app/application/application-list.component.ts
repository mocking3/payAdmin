import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HeaderComponent} from "../inc/header.component";

@Component({
    templateUrl: './application-list.component.html',
    styleUrls: ['./application-list.component.css'],
    directives: [ROUTER_DIRECTIVES, HeaderComponent]
})
export class ApplicationListComponent {
}
