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
                // Todo: capture where the user was going and nav there.
                // Meanwhile redirect the user to the crisis admin
                this.router.navigate(['/apps']);
            }
        });
    }
}
