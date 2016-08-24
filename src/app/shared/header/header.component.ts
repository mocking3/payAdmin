import {Component} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import {AuthService} from '../auth/auth.service.ts';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class HeaderComponent {
    message: string;
    showAppBack: boolean = false;
    showSearch: boolean = false;
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
}