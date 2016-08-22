import {Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';

import {ApiException} from './api.exception';
import {ErrorCode} from './error-code';

@Injectable()
export class MyExceptionHandler {
    constructor(private injector: Injector) {
    }

    call(error: any, stackTrace: any = null, reason: any = null) {
        if (error instanceof ApiException) {
            let e: ApiException = error;
            switch (e.code) {
                case ErrorCode.RSP_CODE_TOKEN_AUTH_ERROR:
                    this.injector.get(Router).navigate(['/login']);
                    break;
                default:
                    console.error(e.message);
            }
        } else {
            console.error(error.message);
        }
    }
}