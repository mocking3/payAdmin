import { Component } from '@angular/core';
import { Router }      from '@angular/router';

import { AuthService } from '../shared/auth';
import {LoginModel} from './shared';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    message: string;
    model: LoginModel = new LoginModel();

    constructor(public authService: AuthService, public router: Router) {
    }

    onSubmit() {
        this.message = 'Trying to log in ...';
        this.authService.login(this.model.username, this.model.password).subscribe(() => {
            if (this.authService.isLoggedIn()) {
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/apps';
                this.router.navigate([redirect]);
            }
        }, error => this.message = <any>error);
    }
}
