import {provideRouter, RouterConfig} from '@angular/router';

import {LoginComponent}  from './login.component.ts';
import {ApplicationComponent} from "./application/application.component";
import {AuthGuard} from "./auth.guard.service";
import {ApplicationListComponent} from "./application/application-list.component";
import {ApplicationDetailComponent} from "./application/application-detail.component";
import {ChannelSettingComponent} from "./application/setting/channel-setting.component";
import {WebhookSettingComponent} from "./application/setting/webhook-setting.component";
import {TodayAnalysisComponent} from "./application/analysis/today-analysis.component";
import {PageNotFoundComponent} from "./page-not-found.component";

export const routes:RouterConfig = [
    {path: '', redirectTo: 'apps', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'apps', component: ApplicationListComponent, canActivate: [AuthGuard]},
    {path: 'apps/:id', component: ApplicationComponent, canActivate: [AuthGuard], children: [
        {path: '', component: TodayAnalysisComponent},
        {path: 'detail', component: ApplicationDetailComponent},
        {path: 'channel-setting', component: ChannelSettingComponent},
        {path: 'webhook-setting', component: WebhookSettingComponent},

    ]},
    {path: '**', component: PageNotFoundComponent}
];