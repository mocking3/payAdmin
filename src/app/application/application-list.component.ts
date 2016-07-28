import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    template: `
    <h2>APPs</h2>
    <p>Please show apps here</p>
    <a [routerLink]="['/apps/1']">app detail</a>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class ApplicationListComponent {
}
