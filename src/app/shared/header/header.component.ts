import {Component} from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from '../services/auth/auth.service.ts';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    message: string;
    showAppBack: boolean = false;
    showSearch: boolean = false;
    appId: number;
    keyword: string;
    constructor(public authService: AuthService, public router: Router) {
    }


    logout() {
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/login']);
        }, error => {throw error});
    }

    goAppList() {
        this.router.navigate(['/apps']);
    }

    goOrderList() {
        this.router.navigate([`/apps/${this.appId}/orders`], { queryParams: { keyword: this.keyword } });
    }
}