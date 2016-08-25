import {provideRouter} from '@angular/router';
import {AuthGuard, AuthService} from './shared/services/auth';
import {routes} from './app.routes';

import {ToastyService, ToastyConfig} from 'ng2-toasty/ng2-toasty';

import {UploadService, ToastService, MessageService} from './shared/services';

const authProviders = [AuthGuard, AuthService];
const appRouterProviders = [provideRouter(routes)];

export const appProviders = [
    appRouterProviders,
    authProviders,
    ToastyService,
    ToastyConfig,
    UploadService,
    ToastService,
    MessageService,
];