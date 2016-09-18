import {Component, OnInit, ViewChild } from '@angular/core';

import {HeaderComponent} from '../../shared/header';

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
})
export class ApplicationComponent implements OnInit {
    @ViewChild(HeaderComponent)
    private headerComponent: HeaderComponent;

    ngOnInit() {
        this.headerComponent.showAppBack = true;
        this.headerComponent.showSearch = true;
    }

}
