import {provideRouter} from '@angular/router';
import {AuthGuard} from './shared/auth/auth.guard.service.ts';
import {AuthService} from './shared/auth/auth.service.ts';
import {routes} from './app.routes';

import {ToastyService, ToastyConfig} from 'ng2-toasty/ng2-toasty';

import {UploadService} from './shared/upload/upload.service';
import {ToastService} from './shared/toast/toast.service';

const authProviders = [AuthGuard, AuthService];
const appRouterProviders = [provideRouter(routes)];

export const appProviders = [
    appRouterProviders,
    authProviders,
    UploadService,
    ToastyService,
    ToastyConfig,
    ToastService
];