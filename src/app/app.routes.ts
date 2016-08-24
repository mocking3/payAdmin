import {RouterConfig} from '@angular/router';

import {PageNotFoundComponent} from './shared';
import {AuthGuard} from './shared/auth';

import {LoginComponent}  from './+login';
import {ApplicationListComponent} from './+applications';
import {ApplicationComponent, ApplicationDetailComponent} from './+applications/application';
import {ChannelSettingComponent} from './+applications/application/settings/channel-setting';
import {WebhookSettingComponent} from './+applications/application/settings/webhook-setting';
import {TodayAnalysisComponent, IncomAnalysisComponent, OrderAnalysisComponent, ChannelAnalysisComponent} from './+applications/application/analysis';
import {OrderComponent} from './+applications/application/orders';
import {ProfileComponent} from './+profile/profile.component';
import {ProfileDetailComponent} from './+profile/detail/profile-detail.component';

export const routes:RouterConfig = [
    {path: '', redirectTo: 'apps', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'apps', component: ApplicationListComponent, canActivate: [AuthGuard]},
    {path: 'apps/:id', component: ApplicationComponent, canActivate: [AuthGuard], children: [
        {path: '', component: TodayAnalysisComponent},
        {path: 'detail', component: ApplicationDetailComponent},
        {path: 'orders', component: OrderComponent},
        {path: 'today-analysis', component: TodayAnalysisComponent},
        {path: 'income-analysis', component: IncomAnalysisComponent},
        {path: 'order-analysis', component: OrderAnalysisComponent},
        {path: 'channel-analysis', component: ChannelAnalysisComponent},
        {path: 'channel-setting', component: ChannelSettingComponent},
        {path: 'webhook-setting', component: WebhookSettingComponent},

    ]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], children: [
        {path: '', component: ProfileDetailComponent},
        {path: 'detail', component: ProfileDetailComponent}
    ]},
    {path: '**', component: PageNotFoundComponent}
];