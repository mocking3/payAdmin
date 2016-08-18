import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-app-left-menu',
    templateUrl: './app-left-menu.component.html',
    styleUrls: ['./app-left-menu.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class AppLeftMenuComponent {
}