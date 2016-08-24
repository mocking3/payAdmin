import {Component, OnInit, ViewChild } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {HeaderComponent} from '../shared/header';
import {ProfileLeftMenuComponent} from '../shared/menus';
@Component({
    template: `
        <div class="epay">
            <my-header></my-header>
            <div class="epay_con clearfix">
                <my-profile-left-menu></my-profile-left-menu>
                <div class="epay_right">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, HeaderComponent, ProfileLeftMenuComponent]
})
export class ProfileComponent implements OnInit {
    @ViewChild(HeaderComponent)
    private headerComponent: HeaderComponent;

    ngOnInit() {
        this.headerComponent.showAppBack = false;
        this.headerComponent.showSearch = false;
    }

}
