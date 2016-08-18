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
var echarts = require('echarts');
var moment = require('moment');
var shared_1 = require('../shared');
var TodayAnalysisComponent = (function () {
    function TodayAnalysisComponent(router, route, elementRef, analysisService) {
        this.router = router;
        this.route = route;
        this.elementRef = elementRef;
        this.analysisService = analysisService;
        this.currentDate = moment();
        this.dataSummary = {
            preOrderCount: 0,
            orderTotalFee: 0,
            orderCount: 0,
            conversion: 0.00
        };
    }
    TodayAnalysisComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.router.routerState.parent(this.route).params.subscribe(function (params) {
            _this.appId = +params['id'];
            _this.analysisService.getDataSummary(_this.appId, _this.currentDate.format('YYYY/MM/DD'), _this.currentDate.clone().add(1, 'days').format('YYYY/MM/DD')).subscribe(function (data) { return _this.dataSummary = data; }, function (error) { return _this.message = error; });
            _this.analysisService.getChargeChangeWithCount(_this.appId, _this.currentDate.format('YYYY/MM/DD'), _this.currentDate.clone().add(1, 'days').format('YYYY/MM/DD')).subscribe(function (data) {
                var date = [], preOrderData = [], orderData = [];
                for (var i = 0; i < data.length; i++) {
                    date.push(data[i].date);
                    preOrderData.push(data[i].preOrder);
                    orderData.push(data[i].order);
                }
                _this.initCountChart(date, preOrderData, orderData);
            }, function (error) { return _this.message = error; });
            _this.analysisService.getChargeChangeWithFee(_this.appId, _this.currentDate.format('YYYY/MM/DD'), _this.currentDate.clone().add(1, 'days').format('YYYY/MM/DD')).subscribe(function (data) {
                var date = [], orderData = [], refundOrderData = [];
                for (var i = 0; i < data.length; i++) {
                    date.push(data[i].date);
                    orderData.push(data[i].order / 100);
                    refundOrderData.push(data[i].refundOrder / 100);
                }
                _this.initFeeChart(date, orderData, refundOrderData);
            }, function (error) { return _this.message = error; });
        });
    };
    TodayAnalysisComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TodayAnalysisComponent.prototype.initCountChart = function (date, preOrderData, orderData) {
        this.countChart = echarts.init(this.elementRef.nativeElement.querySelector('#chargeCount'));
        this.countChart.setOption(this.getOption(date, [preOrderData, orderData], ['发起订单数', '成功订单数']));
    };
    TodayAnalysisComponent.prototype.initFeeChart = function (date, orderData, refundOrderData) {
        this.feeChart = echarts.init(this.elementRef.nativeElement.querySelector('#chargeFee'));
        this.feeChart.setOption(this.getOption(date, [orderData, refundOrderData], ['订单金额', '退款单金额']));
    };
    TodayAnalysisComponent.prototype.getOption = function (xAxisData, seriesData, legendData) {
        var series = [];
        for (var i = 0; i < legendData.length; i++) {
            var obj = {
                name: legendData[i],
                type: 'line',
                stack: '总量',
                areaStyle: { normal: {} },
                data: seriesData[i]
            };
            series.push(obj);
        }
        return {
            // title: {
            //     text: '交易量变化(笔)'
            // },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legendData
            },
            toolbox: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: xAxisData
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: series
        };
    };
    TodayAnalysisComponent = __decorate([
        core_1.Component({
            templateUrl: './today-analysis.component.html',
            styleUrls: ['./today-analysis.component.css'],
            providers: [shared_1.AnalysisService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, core_1.ElementRef, shared_1.AnalysisService])
    ], TodayAnalysisComponent);
    return TodayAnalysisComponent;
}());
exports.TodayAnalysisComponent = TodayAnalysisComponent;
//# sourceMappingURL=today-analysis.component.js.map