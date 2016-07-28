import { Component } from '@angular/core';
import { Router }      from '@angular/router';

import { AuthService } from './auth.service';
@Component({
    template: `
        <h2>LOGIN</h2>
        <p>{{message}}</p>
        <p>
          <button (click)="login()"  >Login</button>
        </p>
    `
})
export class LoginComponent {
    message: string;
    constructor(public authService: AuthService, public router: Router) {
    }

    login() {
        this.message = 'Trying to log in ...';
        this.authService.login().subscribe(() => {
            if (this.authService.isLoggedIn) {
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/apps';
                this.router.navigate([redirect]);
            }
        });
    }
}
