import {provideRouter, RouterConfig} from '@angular/router';

import {LoginComponent}  from './login.component.ts';
import {ApplicationComponent} from "./application/application.component";
import {AuthGuard} from "./auth.guard";
import {AuthService} from "./auth.service";

const routes:RouterConfig = [
    {path: 'login', component: LoginComponent},
    {path: 'apps', component: ApplicationComponent, canActivate: [AuthGuard]}
];

export const appRouterProviders = [
    provideRouter(routes),
    AuthGuard,
    AuthService
];