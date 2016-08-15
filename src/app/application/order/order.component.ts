import { Component, OnInit, OnDestroy, ChangeDetectionStrategy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {PaginatePipe, PaginationControlsCmp, PaginationService} from 'ng2-pagination';

import {OrderService} from "./order.service";
import {OrderInfoModel} from "../../model/order-info";

@Component({
    templateUrl: './order-list.component.html',
    providers: [OrderService, PaginationService],
    directives: [PaginationControlsCmp],
    pipes: [PaginatePipe],
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

    constructor(private router: Router,
                private route: ActivatedRoute,
                private orderService: OrderService) {
    }

    ngOnInit() {
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
        this.orderService.getOrders(this.appId, this.pageNum, this.pageSize).subscribe(
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
}
