import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { enableProdMode } from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { appProviders } from './app/app.provider';

if (process.env.ENV === 'production') {
    enableProdMode();
}
bootstrap(AppComponent, [
    appProviders,
    HTTP_PROVIDERS,
    disableDeprecatedForms(),
    provideForms()
]).catch(err => console.error(err));
