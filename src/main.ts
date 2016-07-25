import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { appRouterProviders } from './app/app.routes';

if (process.env.ENV === 'production') {
    enableProdMode();
}
bootstrap(AppComponent, [
    appRouterProviders
]).catch(err => console.error(err));
