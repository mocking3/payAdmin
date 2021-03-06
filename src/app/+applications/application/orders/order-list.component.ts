import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';
import Moment = moment.Moment;

import {OrderService, OrderInfoModel} from './shared';

@Component({
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css'],
    providers: [OrderService]
})
export class OrderComponent implements OnInit, OnDestroy {
    appId: number;
    message: string;
    pageNum: number = 1;

    pageSize: number = 10;
    total: number;
    orderInfo: OrderInfoModel = new OrderInfoModel();
    orderInfos: OrderInfoModel[];
    loading: boolean;
    searchParams: any = {
        orderTimeBegin: '',
        orderTimeEnd: '',
        channel: '',
        keyword: ''
    };

    showDetail: boolean = false;

    constructor(private route: ActivatedRoute,
                private orderService: OrderService) {
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
                this.getOrders();
            });
        });
    }

    ngOnDestroy() {
        
    }

    getOrders() {
        this.orderService.getOrders(this.appId,
            this.searchParams.orderTimeBegin.format('YYYY/MM/DD'),
            this.searchParams.orderTimeEnd.format('YYYY/MM/DD'),
            this.searchParams.channel,
            this.searchParams.keyword,
            this.pageNum,
            this.pageSize).subscribe(
            data => {
                this.total = data.total;
                this.orderInfos = data.data;
                this.loading = false;
            },
            error => {throw error});
    }

    search(currentPage: number) {
        this.pageNum = currentPage;
        this.getOrders();
    }

    openDetailDialog(orderInfo: OrderInfoModel) {
        this.orderInfo = orderInfo;
        this.showDetail = true;
    }

    closeDetailDialog() {
        this.orderInfo = new OrderInfoModel();
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
        this.searchParams.orderTimeBegin = start;
        this.searchParams.orderTimeEnd = end;
    }
}
