import {Component, OnInit, ViewChild } from '@angular/core';

import {HeaderComponent} from '../shared/header';

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
    `
})
export class ProfileComponent implements OnInit {
    @ViewChild(HeaderComponent)
    private headerComponent: HeaderComponent;

    ngOnInit() {
        this.headerComponent.showAppBack = false;
        this.headerComponent.showSearch = false;
    }

}
