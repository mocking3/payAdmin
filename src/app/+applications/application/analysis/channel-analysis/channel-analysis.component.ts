import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as echarts from 'echarts';
import * as moment from 'moment';
import Moment = moment.Moment;

import {AnalysisService} from "../shared/analysis.service";

@Component({
    templateUrl: './channel-analysis.component.html',
    styleUrls: ['./channel-analysis.component.css'],
    providers: [AnalysisService]
})
export class ChannelAnalysisComponent implements OnInit, OnDestroy {
    appId: number;
    message: string;

    searchParams: any = {
        orderTimeBegin: '',
        orderTimeEnd: '',
    };

    dataSummary: any = {
        preOrderCount: 0,
        orderTotalFee: 0,
        orderCount: 0,
        conversion: 0.00
    };

    countChart: any;
    feeChart: any;

    private sub: any;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private elementRef:ElementRef,
                private analysisService: AnalysisService) {
    }

    ngOnInit() {
        // 初始化日历控件
        this.initDatePicker();

        this.sub = this.router.routerState.parent(this.route).params.subscribe(params => {
            this.appId = +params['id'];
            this.cb(moment().subtract(6, 'days'), moment());

        });
    }

    search() {
        this.analysisService.getDataSummary(this.appId, this.searchParams.orderTimeBegin.format('YYYY/MM/DD'),
            this.searchParams.orderTimeEnd.format('YYYY/MM/DD')).subscribe(
            data => this.dataSummary = data,
            error => this.message = <any>error
        );
        this.analysisService.getChargeChangeWithOrderCount(this.appId, this.searchParams.orderTimeBegin.format('YYYY/MM/DD'),
            this.searchParams.orderTimeEnd.format('YYYY/MM/DD')).subscribe(
            data => {
                let date: string[] = [],
                    preOrderData: number[] = [],
                    orderData: number[] = [];
                for(let i=0; i<data.length; i++) {
                    date.push(data[i].date);
                    preOrderData.push(data[i].preOrder);
                    orderData.push(data[i].order);
                }
                this.initCountChart(date, preOrderData, orderData);
            },
            error => this.message = <any>error
        );
        this.analysisService.getChargeChangeWithOrderFee(this.appId, this.searchParams.orderTimeBegin.format('YYYY/MM/DD'),
            this.searchParams.orderTimeEnd.format('YYYY/MM/DD')).subscribe(
            data => {
                let date: string[] = [],
                    orderData: number[] = [],
                    refundOrderData: number[] = [];
                for(let i=0; i<data.length; i++) {
                    date.push(data[i].date);
                    orderData.push(data[i].order/100);
                    refundOrderData.push(data[i].refundOrder/100);
                }
                this.initFeeChart(date, orderData, refundOrderData);
            },
            error => this.message = <any>error
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    initCountChart(date: string[], preOrderData: number[], orderData: number[]) {
        this.countChart = echarts.init(this.elementRef.nativeElement.querySelector('#chargeCount'));
        this.countChart.setOption(this.getOption(date, [preOrderData, orderData], ['发起订单数', '成功订单数']));
    }

    initFeeChart(date: string[], orderData: number[], refundOrderData: number[]) {
        this.feeChart = echarts.init(this.elementRef.nativeElement.querySelector('#chargeFee'));
        this.feeChart.setOption(this.getOption(date, [orderData, refundOrderData], ['订单金额', '退款单金额']));
    }

    getOption(xAxisData: string[], seriesData: number[][], legendData: string[]) {
        let series: any = [];
        for (let i=0; i<legendData.length; i++) {
            let obj = {
                name: legendData[i],
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:seriesData[i]
            };
            series.push(obj);
        }
        return {
            // title: {
            //     text: '交易量变化(笔)'
            // },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data: legendData
            },
            toolbox: {
                // feature: {
                //     saveAsImage: {}
                // }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    axisLabel: {
                        interval: 0, //横轴信息全部显示
                        rotate: xAxisData.length > 24 ? 40 : 0, //60度角倾斜显示
                        formatter:function(val: string){
                            if (xAxisData.length > 15 && val.length > 5)
                                return val.substring(val.length-5, val.length);
                            else
                                return val;
                        }
                    },
                    type : 'category',
                    boundaryGap : false,
                    data : xAxisData
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : series
        };
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
            maxDate: moment()
        }, (start: Moment, end: Moment) => this.cb(start, end));
    }

    cb(start: Moment, end: Moment) {
        this.searchParams.orderTimeBegin = start;
        this.searchParams.orderTimeEnd = end;
        this.search();
    }
    
}