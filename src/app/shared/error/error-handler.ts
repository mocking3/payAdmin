import {Injectable, Injector, ErrorHandler} from '@angular/core';
import { Router } from '@angular/router';

import {ApiException} from './api.exception';
import {ErrorCode} from './error-code';
import {ToastService} from '../services/toast.service.ts';

@Injectable()
export class MyErrorHandler implements ErrorHandler{
    constructor(private injector: Injector) {
    }

    handleError(error: any) : void {
        console.error(error);
        let toastService:ToastService = this.injector.get(ToastService);
        if (error instanceof ApiException) {
            let e: ApiException = error;
            switch (e.code) {
                case ErrorCode.RSP_CODE_TOKEN_AUTH_ERROR:
                    this.injector.get(Router).navigate(['/login']);
                    toastService.triggerToast('提示', `${e.msg}，请重新登录`, 'info');
                    break;
                default:
                    toastService.triggerToast('错误', `系统异常，${e.msg}`, 'error');
            }
        } else if (error.ok === false) { //
            toastService.triggerToast('错误', `连接服务器错误，请稍候重试`, 'error');
        } else {
            toastService.triggerToast('错误', `未知错误，建议用谷歌浏览器打开`, 'error');
        }
    }
}