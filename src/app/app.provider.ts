import {provideRouter} from '@angular/router';
import {AuthGuard} from "./auth.guard.service";
import {AuthService} from "./auth.service";
import {routes} from "./app.routes";
import {UploadService} from "./upload/upload.service";

const authProviders = [AuthGuard, AuthService];
const appRouterProviders = [provideRouter(routes)];

export const appProviders = [
    appRouterProviders,
    authProviders,
    UploadService
];