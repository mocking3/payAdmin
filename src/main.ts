import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { enableProdMode, ExceptionHandler } from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { appProviders } from './app/app.provider';
import { MyExceptionHandler } from './app/shared';

if (process.env.ENV === 'production') {
    enableProdMode();
}
bootstrap(AppComponent, [
    appProviders,
    HTTP_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
    {provide: ExceptionHandler, useClass: MyExceptionHandler}
]).catch(err => console.error(err));
