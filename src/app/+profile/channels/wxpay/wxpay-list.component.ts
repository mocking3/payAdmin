import {Component, OnInit} from '@angular/core';
import {WxpayService, WxconfigModel} from "./shared";
import {ToastService, UploadService} from '../../../shared/services';

@Component({
    templateUrl: './wxpay-list.component.html',
    styleUrls: ['./wxpay-list.component.css'],
    providers: [WxpayService]
})
export class WxpayListComponent implements OnInit {

    message: string;

    wxconfig: WxconfigModel = new WxconfigModel();
    wxconfigs: WxconfigModel[];

    showAdd: boolean = false;
    showUpdate: boolean = false;
    showDetail: boolean = false;

    uploadProgress: number;

    constructor(private wxpayService: WxpayService,
                private uploadService: UploadService,
                private toastService: ToastService) {
    }

    ngOnInit() {
        this.wxpayService.getWxconfigs().subscribe(
            data => {
                this.wxconfigs = data;
            },
            error => {throw error}
        );
    }

    createWxconfig() {
        this.wxpayService.createWxconfig(this.wxconfig).subscribe(
            data => {
                this.wxconfigs.push(data);
                this.message = '创建成功';
                this.toastService.triggerToast('提示', this.message, 'success');
                this.wxconfig = new WxconfigModel();
                this.showAdd = false;
            },
            error => {throw error});
    }


    updateWxconfig() {
        this.wxpayService.updateWxconfig(this.wxconfig).subscribe(
            data => {
                this.message = '更新成功';
                this.toastService.triggerToast('提示', this.message, 'success');
                this.wxconfig = new WxconfigModel();
                this.showUpdate = false;
            },
            error => {throw error});
    }

    changeStatus(wxconfig: WxconfigModel) {
        this.wxpayService.changeStatus(wxconfig.id ,!wxconfig.status).subscribe(
            data => {
                this.message = !wxconfig.status ? '启用成功' : '禁用成功';
                this.toastService.triggerToast('提示', this.message, 'success');
                wxconfig.status = !wxconfig.status;
            },
            error => {throw error});
    }

    openCreateDialog() {
        this.showAdd = true;
    }

    openUpdateDialog(wxconfig: WxconfigModel) {
        this.wxconfig = wxconfig;
        this.showUpdate = true;
    }

    openDetailDialog(wxconfig: WxconfigModel) {
        this.wxconfig = wxconfig;
        this.showDetail = true;
    }

    closeDetailDialog() {
        this.wxconfig = new WxconfigModel();
        this.showDetail = false;
    }

    cancel() {
        this.showAdd = false;
        this.showUpdate = false;
        this.wxconfig = new WxconfigModel();
    }

    upload($event: any) {
        this.uploadService.getObserver().subscribe(progress =>  {
            this.uploadProgress = progress;
            console.log(progress);
        });
        this.uploadService.upload($event.target.files[0]).subscribe(
            url => this.wxconfig.certLocalPath = url,
            error => {throw error}
        );
    }
}