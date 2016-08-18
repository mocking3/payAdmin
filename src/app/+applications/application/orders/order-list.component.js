"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var ng2_pagination_1 = require('ng2-pagination');
var moment = require('moment');
var shared_1 = require('./shared');
var OrderComponent = (function () {
    function OrderComponent(router, route, orderService) {
        this.router = router;
        this.route = route;
        this.orderService = orderService;
        this.pageNum = 1;
        this.pageSize = 10;
        this.searchParams = {
            orderTimeBegin: '',
            orderTimeEnd: '',
            channel: '',
            outTradeNo: ''
        };
    }
    OrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 初始化日历控件
        this.initDatePicker();
        // 获取父路由变量
        this.sub = this.router.routerState.parent(this.route).params.subscribe(function (params) {
            _this.appId = +params['id'];
            _this.getOrders();
        });
    };
    OrderComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    OrderComponent.prototype.getOrders = function () {
        var _this = this;
        this.orderService.getOrders(this.appId, this.searchParams.orderTimeBegin.format('YYYY/MM/DD'), this.searchParams.orderTimeEnd.format('YYYY/MM/DD'), this.searchParams.channel, this.searchParams.outTradeNo, this.pageNum, this.pageSize).subscribe(function (data) {
            _this.total = data.total;
            _this.orderInfos = data.data;
            _this.loading = false;
        }, function (error) { return _this.message = error; });
    };
    OrderComponent.prototype.search = function (currentPage) {
        this.pageNum = currentPage;
        this.getOrders();
    };
    OrderComponent.prototype.initDatePicker = function () {
        var _this = this;
        $('.daterange').daterangepicker({
            locale: {
                applyLabel: '确定',
                cancelLabel: '取消',
                format: 'MM/DD/YYYY',
                daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            },
            maxDate: moment()
        }, function (start, end) { return _this.cb(start, end); });
        this.cb(moment().subtract(6, 'days'), moment());
    };
    OrderComponent.prototype.cb = function (start, end) {
        this.searchParams.orderTimeBegin = start;
        this.searchParams.orderTimeEnd = end;
    };
    OrderComponent = __decorate([
        core_1.Component({
            templateUrl: './order-list.component.html',
            styleUrls: ['./order-list.component.css'],
            providers: [shared_1.OrderService, ng2_pagination_1.PaginationService],
            directives: [ng2_pagination_1.PaginationControlsCmp],
            pipes: [ng2_pagination_1.PaginatePipe]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, shared_1.OrderService])
    ], OrderComponent);
    return OrderComponent;
}());
exports.OrderComponent = OrderComponent;
//# sourceMappingURL=order-list.component.js.map