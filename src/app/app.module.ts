import {NgModule, ErrorHandler} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';
import {ToastyModule} from 'ng2-toasty';
// import {SlimLoadingBarModule} from 'ng2-slim-loading-bar'; 这个有bug，不使用module
import {SlimLoadingBarService, SlimLoadingBarComponent} from 'ng2-slim-loading-bar';

import {AppComponent}   from './app.component';
import {routes} from './app.routes';
import {MyErrorHandler} from './shared/error';
import {HeaderComponent} from './shared/header';
import {AppLeftMenuComponent, ProfileLeftMenuComponent} from './shared/menus';
import {ClipboardDirective, EqualValidatorDirective} from './shared/directives';
import {ChannelPipe} from './shared/pipes';
import {AuthGuard, AuthService, UploadService, ToastService, MessageService} from './shared/services';

import {LoginComponent}  from './+login';
import {RegisterComponent} from './+register';
import {PwdForgetComponent} from './+pwd-forget';
import {ApplicationListComponent} from './+applications';
import {ApplicationComponent, ApplicationDetailComponent} from './+applications/application';
import {ChannelSettingComponent} from './+applications/application/settings/channel-setting';
import {WebhookSettingComponent} from './+applications/application/settings/webhook-setting';
import {TodayAnalysisComponent, IncomAnalysisComponent, OrderAnalysisComponent, ChannelAnalysisComponent} from './+applications/application/analysis';
import {OrderComponent} from './+applications/application/orders';
import {ProfileComponent} from './+profile/profile.component';
import {ProfileBaseComponent} from './+profile/base';
import {ProfileBindComponent} from './+profile/bind';
import {PwdResetComponent} from './+profile/pwd-reset';
import {WxpayListComponent} from './+profile/channels';

import {PageNotFoundComponent} from './shared';

@NgModule({
    declarations: [AppComponent,
        HeaderComponent,
        AppLeftMenuComponent,
        ProfileLeftMenuComponent,

        LoginComponent,
        RegisterComponent,
        PwdForgetComponent,
        ApplicationComponent,
        ApplicationDetailComponent,
        ApplicationListComponent,
        ChannelSettingComponent,
        WebhookSettingComponent,
        TodayAnalysisComponent,
        IncomAnalysisComponent,
        OrderAnalysisComponent,
        ChannelAnalysisComponent,
        OrderComponent,
        ProfileComponent,
        ProfileBaseComponent,
        ProfileBindComponent,
        PwdResetComponent,
        WxpayListComponent,
        PageNotFoundComponent,

        ClipboardDirective,
        EqualValidatorDirective,
        ChannelPipe,

        PaginationControlsCmp,
        PaginatePipe,
        SlimLoadingBarComponent
    ],
    imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(routes), ToastyModule, /*SlimLoadingBarModule*/],
    providers: [AuthGuard, AuthService,
        UploadService,
        ToastService,
        MessageService,
        PaginationService,
        SlimLoadingBarService,
        {provide: ErrorHandler, useClass: MyErrorHandler}
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}

