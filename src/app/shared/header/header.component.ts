import {Component} from '@angular/core';
import { Router }      from '@angular/router';

import {AuthService} from '../auth/auth.service.ts';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
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
        }, error => this.message = <any>error);
    }

    goAppList() {
        this.router.navigate(['/apps']);
    }
}