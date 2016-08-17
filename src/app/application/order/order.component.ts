import { Component, OnInit, OnDestroy, ChangeDetectionStrategy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';
import * as moment from 'moment';

import {OrderService} from "./order.service";
import {OrderInfoModel} from "../../model/order-info";
import Moment = moment.Moment;

@Component({
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css'],
    providers: [OrderService, PaginationService],
    directives: [PaginationControlsCmp],
    pipes: [PaginatePipe]
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit, OnDestroy {
    appId: number;
    message: string;
    sub: any;

    pageNum: number = 1;
    pageSize: number = 10;
    total: number;
    orderInfos: OrderInfoModel[];
    loading: boolean;

    searchParams: any = {
        orderTimeBegin: '',
        orderTimeEnd: '',
        channel: '',
        outTradeNo: ''
    };

    constructor(private router: Router,
                private route: ActivatedRoute,
                private orderService: OrderService) {
    }

    ngOnInit() {
        // 初始化日历控件
        this.initDatePicker();
        // 获取父路由变量
        this.sub = this.router.routerState.parent(this.route).params.subscribe(params => {
            this.appId = +params['id'];
            this.getOrders();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getOrders() {
        this.orderService.getOrders(this.appId,
            this.searchParams.orderTimeBegin,
            this.searchParams.orderTimeEnd,
            this.searchParams.channel,
            this.searchParams.outTradeNo,
            this.pageNum,
            this.pageSize).subscribe(
            data => {
                this.total = data.total;
                this.orderInfos = data.data;
                this.loading = false;
            },
            error => this.message = <any>error);
    }

    search(currentPage: number) {
        this.pageNum = currentPage;
        this.getOrders();
    }

    initDatePicker() {
        $('.daterange').daterangepicker({
            maxDate: moment()
        }, (start: Moment, end: Moment) => this.cb(start, end));
        this.cb(moment().subtract(6, 'days'), moment());
    }

    cb(start: Moment, end: Moment) {
        this.searchParams.orderTimeBegin = start.format('YYYY/MM/DD');
        this.searchParams.orderTimeEnd = end.format('YYYY/MM/DD');
    }
}
