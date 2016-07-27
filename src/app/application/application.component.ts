import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {HeaderComponent} from '../inc/header.component';
import {AppLeftMenuComponent} from '../inc/app-left-menu.component';

@Component({
    template: `
        <my-header></my-header>
        <my-app-left-menu></my-app-left-menu>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES, HeaderComponent, AppLeftMenuComponent]
})
export class ApplicationComponent {
}
