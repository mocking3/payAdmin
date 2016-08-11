import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import {SERVER_URL} from "../app.constants";

@Injectable()
export class UploadService {
    private url: string = SERVER_URL + '/fileUpload';
    private progress$:Observable<number>;
    private progress:number = 0;
    private progressObserver:Observer<number>;

    constructor() {
        this.progress$ = Observable.create((observer: Observer<number>)  => {
            this.progressObserver = observer
        }).share();
    }

    public getObserver():Observable<number> {
        return this.progress$;
    }

    public upload(file:File):Observable<string> {
        let url = this.url;
        return Observable.create((observer: Observer<any>) => {
            let formData:FormData = new FormData(),
                xhr:XMLHttpRequest = new XMLHttpRequest();

            // xhr.setRequestHeader('authorization', '');
            formData.append("file", file, file.name);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let body = JSON.parse(xhr.response);
                        if (body && body.code) {
                            let errMsg = body.msg ? `${body.msg}[${body.code}]` : '系统异常';
                            observer.error(errMsg);
                        } else {
                            observer.next(body.url);
                            observer.complete();
                        }
                    } else {
                        observer.error(`${xhr.status}-${xhr.statusText}`);
                    }
                }
            };

            // UploadService.setUploadUpdateInterval(500);

            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                this.progressObserver.next(this.progress);
            };
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }

    private static setUploadUpdateInterval(interval:number):void {
        setInterval(() => {
        }, interval);
    }
}