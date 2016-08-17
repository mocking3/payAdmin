import {Component, OnInit, ViewChild } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {HeaderComponent} from '../inc/header.component';
import {AppLeftMenuComponent} from '../inc/app-left-menu.component';
@Component({
    template: `
        <div class="epay">
            <my-header></my-header>
            <div class="epay_con clearfix">
                <my-app-left-menu></my-app-left-menu>
                <div class="epay_right">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, HeaderComponent, AppLeftMenuComponent]
})
export class ApplicationComponent implements OnInit {
    @ViewChild(HeaderComponent)
    private headerComponent: HeaderComponent;

    ngOnInit() {
        this.headerComponent.showAppBack = true;
        this.headerComponent.showSearch = true;
    }

}
