import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject'

export interface Toast {
    title: string,
    message: string,
    type: string
}
@Injectable()
export class ToastService {
    private toastTriggeredSubject = new Subject<Toast>();
    toastTriggered = this.toastTriggeredSubject.asObservable();

    triggerToast(title: string, message: string, type?: string) {
        if (!type) {
            type = 'default';
        }
        this.toastTriggeredSubject.next(<Toast>{ title: title, message: message, type: type });
    }
}