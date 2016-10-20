import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import Moment = moment.Moment;

import {RefundOrderService, RefundOrderInfoModel} from './shared';

@Component({
    templateUrl: './refund-order-list.component.html',
    styleUrls: ['./refund-order-list.component.css'],
    providers: [RefundOrderService]
})
export class RefundOrderComponent implements OnInit, OnDestroy {
    appId: number;
    message: string;
    pageNum: number = 1;

    pageSize: number = 10;
    total: number;
    refundOrderInfo: RefundOrderInfoModel = new RefundOrderInfoModel();
    refundOrderInfos: RefundOrderInfoModel[];
    loading: boolean;
    searchParams: any = {
        refundTimeBegin: '',
        refundTimeEnd: '',
        channel: '',
        keyword: ''
    };

    showDetail: boolean = false;

    constructor(private route: ActivatedRoute,
                private refundOrderService: RefundOrderService) {
    }

    ngOnInit() {
        // 初始化日历控件
        this.initDatePicker();
        this.route.queryParams.subscribe(params => {
            if (params['keyword'])
                this.searchParams.keyword = params['keyword'];
            // 获取父路由变量
            this.route.parent.params.subscribe(params => {
                this.appId = +params['id'];
                this.getRefundOrders();
            });
        });
    }

    ngOnDestroy() {
        
    }

    getRefundOrders() {
        this.refundOrderService.getRefundOrders(this.appId,
            this.searchParams.refundTimeBegin.format('YYYY/MM/DD'),
            this.searchParams.refundTimeEnd.format('YYYY/MM/DD'),
            this.searchParams.channel,
            this.searchParams.keyword,
            this.pageNum,
            this.pageSize).subscribe(
            data => {
                this.total = data.total;
                this.refundOrderInfos = data.data;
                this.loading = false;
            },
            error => {throw error});
    }

    search(currentPage: number) {
        this.pageNum = currentPage;
        this.getRefundOrders();
    }

    openDetailDialog(refundOrderInfo: RefundOrderInfoModel) {
        this.refundOrderInfo = refundOrderInfo;
        this.showDetail = true;
    }

    closeDetailDialog() {
        this.refundOrderInfo = new RefundOrderInfoModel();
        this.showDetail = false;
    }

    initDatePicker() {
        $('.daterange').daterangepicker({
            locale: {
                applyLabel: '确定',
                cancelLabel: '取消',
                format: 'YYYY/MM/DD',
                daysOfWeek: ['日','一','二','三','四','五','六'],
                monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            },
            startDate: moment().subtract(6, 'days'),
            endDate: moment(),
            maxDate: moment()
        }, (start: Moment, end: Moment) => this.cb(start, end));
        this.cb(moment().subtract(6, 'days'), moment());
    }

    cb(start: Moment, end: Moment) {
        this.searchParams.refundTimeBegin = start;
        this.searchParams.refundTimeEnd = end;
    }
}
