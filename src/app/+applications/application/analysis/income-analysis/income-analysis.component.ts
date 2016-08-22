import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as echarts from 'echarts';
import * as moment from 'moment';
import Moment = moment.Moment;

import {AnalysisService} from '../shared/analysis.service';
import {Constants} from '../../../../shared/constants';
import values = require('core-js/fn/array/values');

@Component({
    templateUrl: './income-analysis.component.html',
    styleUrls: ['./income-analysis.component.css'],
    providers: [AnalysisService]
})
export class IncomAnalysisComponent implements OnInit, OnDestroy {
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

    orderFeeChart: any;
    channelFeeChart: any;

    private sub: any;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private elementRef:ElementRef,
                private analysisService: AnalysisService) {
    }

    ngOnInit() {
        // 初始化日历控件
        this.initDatePicker();
        // 初始化表格
        this.orderFeeChart = echarts.init(this.elementRef.nativeElement.querySelector('#orderChargeFee'));
        this.orderFeeChart.setOption(Constants.getLineEchartOption([], [], []));
        this.channelFeeChart = echarts.init(this.elementRef.nativeElement.querySelector('#channelChargeFee'));
        this.channelFeeChart.setOption(Constants.getLineEchartOption([], [], []));

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
        // 订单/退款单 金额变化
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
                // 设置表格
                this.orderFeeChart.setOption(Constants.getLineEchartOption(date, [orderData, refundOrderData], ['订单金额', '退款单金额']));
            },
            error => this.message = <any>error
        );
        // 渠道金额变化
        this.analysisService.getChargeChangeWithChannelFee(this.appId, this.searchParams.orderTimeBegin.format('YYYY/MM/DD'),
            this.searchParams.orderTimeEnd.format('YYYY/MM/DD')).subscribe(
            data => {
                let date: string[] = [],
                    channelData: number[][] = [],
                    legendData: string[] = [];
                let channels: string[] = data.channels;
                let map = new Map<string, number[]>();
                channels.forEach((value: string) => {
                    legendData.push(Constants.CHANNEL[value]);
                    map.set(value, []);
                });

                let cdata: any[] = data.data;
                for(let i=0; i<cdata.length; i++) {
                    date.push(cdata[i].date);
                    map.forEach((value: number[], index: string) => {
                        value.push(cdata[i][index] / 100);
                    });
                }
                map.forEach((value: number[]) => {
                    channelData.push(value);
                });
                // 设置表格
                this.channelFeeChart.setOption(Constants.getLineEchartOption(date, channelData, legendData));
            },
            error => this.message = <any>error
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
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
    }

    cb(start: Moment, end: Moment) {
        this.searchParams.orderTimeBegin = start;
        this.searchParams.orderTimeEnd = end;
        this.search();
    }
    
}