import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import {ToastyService, ToastOptions, Toasty} from 'ng2-toasty/ng2-toasty';
import {SlimLoadingBarService, SlimLoadingBarComponent} from 'ng2-slim-loading-bar';
import {ToastService} from './shared/toast/toast.service';

import '../../public/css/styles.css';

@Component({
    selector: 'my-app',
    template: `
        <router-outlet></router-outlet>
        <ng2-toasty></ng2-toasty>
        <ng2-slim-loading-bar></ng2-slim-loading-bar>
    `,
    providers: [SlimLoadingBarService],
    directives: [ROUTER_DIRECTIVES, Toasty, SlimLoadingBarComponent]
})
export class AppComponent implements OnInit {
    
    constructor(private toastyService:ToastyService,
                private toastService: ToastService,
                private slimLoadingBarService: SlimLoadingBarService,
                private router: Router) {
    }

    ngOnInit() {
        this.runSlimLoader();

        this.toastService.toastTriggered.subscribe(toast => {
            let toastOptions: ToastOptions = {
                title: toast.title,
                msg: toast.message,
                showClose: true,
                timeout: 5000,
                theme: 'default'
            };

            if (toast.type == 'default') {
                this.toastyService.default(toastOptions);
            } else if (toast.type == 'info') {
                this.toastyService.info(toastOptions);
            } else if (toast.type == 'success') {
                this.toastyService.success(toastOptions);
            } else if (toast.type == 'error') {
                this.toastyService.error(toastOptions);
            } else if (toast.type == 'warning') {
                this.toastyService.warning(toastOptions);
            }
        });
    }

    runSlimLoader() {
        this.slimLoadingBarService.start();
        setTimeout(() => {
            this.slimLoadingBarService.complete();
        }, 1000);
    }
}
