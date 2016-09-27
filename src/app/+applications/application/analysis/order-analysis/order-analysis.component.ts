import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as echarts from 'echarts';
import * as moment from 'moment';
import Moment = moment.Moment;

import {AnalysisService} from '../shared/analysis.service';
import {Constants} from '../../../../shared/constants';

@Component({
    templateUrl: './order-analysis.component.html',
    styleUrls: ['./order-analysis.component.css'],
    providers: [AnalysisService]
})
export class OrderAnalysisComponent implements OnInit, OnDestroy {
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

    orderCountChart: any;
    channelCountChart: any;

    

    constructor(private route: ActivatedRoute,
                private elementRef:ElementRef,
                private analysisService: AnalysisService) {
    }

    ngOnInit() {
        // 初始化日历控件
        this.initDatePicker();
        // 初始化图表
        this.orderCountChart = echarts.init(this.elementRef.nativeElement.querySelector('#orderChargeCount'));
        this.orderCountChart.setOption(Constants.getLineEchartOption([], [], []));
        this.channelCountChart = echarts.init(this.elementRef.nativeElement.querySelector('#channelChargeCount'));
        this.channelCountChart.setOption(Constants.getLineEchartOption([], [], []));

        this.route.parent.params.subscribe(params => {
            this.appId = +params['id'];
            this.cb(moment().subtract(6, 'days'), moment());

        });
    }

    search() {
        this.analysisService.getDataSummary(this.appId, this.searchParams.orderTimeBegin.format('YYYY/MM/DD'),
            this.searchParams.orderTimeEnd.format('YYYY/MM/DD')).subscribe(
            data => this.dataSummary = data,
            error => {throw error}
        );
        // 订单/退款单 数量变化
        this.analysisService.getChargeChangeWithOrderCount(this.appId, this.searchParams.orderTimeBegin.format('YYYY/MM/DD'),
            this.searchParams.orderTimeEnd.format('YYYY/MM/DD')).subscribe(
            data => {
                let date: string[] = [],
                    orderData: number[] = [],
                    preOrderData: number[] = [];
                for(let i=0; i<data.length; i++) {
                    date.push(data[i].date);
                    orderData.push(data[i].order);
                    preOrderData.push(data[i].preOrder);
                }
                // 设置图表
                this.orderCountChart.setOption(Constants.getLineEchartOption(date, [orderData, preOrderData], ['订单数', '退款单数']));
            },
            error => {throw error}
        );
        // 渠道金额数量
        this.analysisService.getChargeChangeWithChannelCount(this.appId, this.searchParams.orderTimeBegin.format('YYYY/MM/DD'),
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
                        value.push(cdata[i][index]);
                    });
                }
                map.forEach((value: number[]) => {
                    channelData.push(value);
                });
                // 设置图表
                this.channelCountChart.setOption(Constants.getLineEchartOption(date, channelData, legendData));
            },
            error => {throw error}
        );
    }

    ngOnDestroy() {
        
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