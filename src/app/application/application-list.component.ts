import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HeaderComponent} from "../inc/header.component";

@Component({
    template: `
    <my-header></my-header>
    <h2>APPs</h2>
    <p>Please show apps here</p>
    <a [routerLink]="['/apps/1']">app detail</a>
    `,
    directives: [ROUTER_DIRECTIVES, HeaderComponent]
})
export class ApplicationListComponent {
}
