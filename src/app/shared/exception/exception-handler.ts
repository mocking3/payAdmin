import {Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';

import {ApiException} from './api.exception';
import {ErrorCode} from './error-code';
import {ToastService} from '../toast/toast.service';

@Injectable()
export class MyExceptionHandler {
    constructor(private injector: Injector) {
    }

    call(error: any, stackTrace: any = null, reason: any = null) {
        console.error(error.message);
        let toastService:ToastService = this.injector.get(ToastService);
        if (error instanceof ApiException) {
            let e: ApiException = error;
            switch (e.code) {
                case ErrorCode.RSP_CODE_TOKEN_AUTH_ERROR:
                    this.injector.get(Router).navigate(['/login']);
                    toastService.triggerToast('提示：', `${e.msg}，请重新登录`, 'info');
                    break;
                default:
                    toastService.triggerToast('错误：', `系统异常，${e.msg}`, 'error');
            }
        } else {
            toastService.triggerToast('错误：', `链接服务器错误，请稍候重试`, 'error');
        }
    }
}