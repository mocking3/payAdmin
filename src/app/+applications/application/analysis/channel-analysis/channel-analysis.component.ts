import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as echarts from 'echarts';
import * as moment from 'moment';
import Moment = moment.Moment;

import {NameValue} from '../../../../shared/model';
import {Constants} from '../../../../shared/constants';
import {AnalysisService} from '../shared/analysis.service';


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
        // 初始化图表
        this.countChart = echarts.init(this.elementRef.nativeElement.querySelector('#chargeCount'));
        this.countChart.setOption(Constants.getPieEchartOption([], [], []));
        this.feeChart = echarts.init(this.elementRef.nativeElement.querySelector('#chargeFee'));
        this.feeChart.setOption(Constants.getPieEchartOption([], [], []));

        this.sub = this.router.routerState.parent(this.route).params.subscribe(params => {
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
        this.analysisService.getChargeTotalWithChannelCount(this.appId, this.searchParams.orderTimeBegin.format('YYYY/MM/DD'),
            this.searchParams.orderTimeEnd.format('YYYY/MM/DD')).subscribe(
            data => {
                let pChannelData: NameValue[] = [],
                    channelData: NameValue[] = [],
                    channellegendData: string[] = [],
                    legendData: string[] = [];
                let map = new Map<string, number>();
                for(let i=0; i<data.length; i++) {
                    let pChannelKey = Constants.getPChannel(data[i].channel);
                    if (map.has(pChannelKey)) {
                        map.set(pChannelKey, map.get(pChannelKey) + data[i].total);
                    } else {
                        map.set(pChannelKey, data[i].total);
                    }

                    let channel: NameValue = new NameValue();
                    channel.name = Constants.CHANNEL[data[i].channel];
                    channel.value = data[i].total;
                    channelData.push(channel);
                    channellegendData.push(channel.name);
                }

                map.forEach((value, index) => {
                    let pChannel: NameValue = new NameValue();
                    pChannel.name = Constants.CHANNEL[index];
                    pChannel.value = value;
                    pChannelData.push(pChannel);
                    legendData.push(pChannel.name);
                });
                legendData = legendData.concat(channellegendData);
                // 设置图表
                this.countChart.setOption(Constants.getPieEchartOption(pChannelData, channelData, legendData));
            },
            error => {throw error}
        );
        this.analysisService.getChargeTotalWithChannelFee(this.appId, this.searchParams.orderTimeBegin.format('YYYY/MM/DD'),
            this.searchParams.orderTimeEnd.format('YYYY/MM/DD')).subscribe(
            data => {
                let pChannelData: NameValue[] = [],
                    channelData: NameValue[] = [],
                    channellegendData: string[] = [],
                    legendData: string[] = [];
                let map = new Map<string, number>();
                for(let i=0; i<data.length; i++) {
                    let pChannelKey = Constants.getPChannel(data[i].channel);
                    if (map.has(pChannelKey)) {
                        map.set(pChannelKey, map.get(pChannelKey) + data[i].total/100);
                    } else {
                        map.set(pChannelKey, data[i].total/100);
                    }

                    let channel: NameValue = new NameValue();
                    channel.name = Constants.CHANNEL[data[i].channel];
                    channel.value = data[i].total/100;
                    channelData.push(channel);
                    channellegendData.push(channel.name);
                }

                map.forEach((value, index) => {
                    let pChannel: NameValue = new NameValue();
                    pChannel.name = Constants.CHANNEL[index];
                    pChannel.value = value;
                    pChannelData.push(pChannel);
                    legendData.push(pChannel.name);
                });
                legendData = legendData.concat(channellegendData);
                // 设置图表
                this.feeChart.setOption(Constants.getPieEchartOption(pChannelData, channelData, legendData));
            },
            error => {throw error}
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