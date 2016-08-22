import {BaseException} from '@angular/core';

export class ApiException extends BaseException {
    code: number;
    msg: string;
    constructor(code: number, msg: string) {
        super(msg + '[' + code + ']');
        this.message = msg + '[' + code + ']';

        this.code =  code;
        this.msg = msg;
    }
}