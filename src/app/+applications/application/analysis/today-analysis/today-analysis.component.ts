import {Component, OnInit, OnDestroy, ElementRef}  from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as echarts from 'echarts';
import * as moment from 'moment';
import Moment = moment.Moment;

import {Constants} from '../../../../shared/constants';
import {AnalysisService} from '../shared';


@Component({
    templateUrl: './today-analysis.component.html',
    styleUrls: ['./today-analysis.component.css'],
    providers: [AnalysisService]
    
})
export class TodayAnalysisComponent implements OnInit, OnDestroy {
    message: string;
    currentDate: Moment = moment();
    sub: any;
    appId: number;
    dataSummary: any = {
        preOrderCount: 0,
        orderTotalFee: 0,
        orderCount: 0,
        conversion: 0.00
    };

    countChart: any;
    feeChart: any;

    constructor(private route: ActivatedRoute,
                private elementRef:ElementRef,
                private analysisService: AnalysisService) {
    }

    ngOnInit() {
        // 初始化图表
        this.initCountChart();
        this.initFeeChart();

        this.sub = this.route.parent.params.subscribe(params => {
            this.appId = +params['id'];

            this.analysisService.getDataSummary(this.appId, this.currentDate.format('YYYY/MM/DD'),
                                        this.currentDate.format('YYYY/MM/DD')).subscribe(
                data => this.dataSummary = data,
                error => {throw error}
            );
            this.analysisService.getChargeChangeWithOrderCount(this.appId, this.currentDate.format('YYYY/MM/DD'),
                                        this.currentDate.format('YYYY/MM/DD')).subscribe(
                data => {
                    let date: string[] = [],
                        preOrderData: number[] = [],
                        orderData: number[] = [];
                    for(let i=0; i<data.length; i++) {
                        date.push(data[i].date);
                        preOrderData.push(data[i].preOrder);
                        orderData.push(data[i].order);
                    }
                    //  设置图表
                    this.countChart.setOption(Constants.getLineEchartOption(date, [preOrderData, orderData], ['发起订单数', '成功订单数']));
                },
                error => {throw error}
            );
            this.analysisService.getChargeChangeWithOrderFee(this.appId, this.currentDate.format('YYYY/MM/DD'),
                                        this.currentDate.format('YYYY/MM/DD')).subscribe(
                data => {
                    let date: string[] = [],
                        orderData: number[] = [],
                        refundOrderData: number[] = [];
                    for(let i=0; i<data.length; i++) {
                        date.push(data[i].date);
                        orderData.push(data[i].order/100);
                        refundOrderData.push(data[i].refundOrder/100);
                    }
                    // 设置图表
                    this.feeChart.setOption(Constants.getLineEchartOption(date, [orderData, refundOrderData], ['订单金额', '退款单金额']));
                },
                error => {throw error}
            );
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    initCountChart() {
        this.countChart = echarts.init(this.elementRef.nativeElement.querySelector('#chargeCount'));
        this.countChart.setOption(Constants.getLineEchartOption([], [], []));
    }

    initFeeChart() {
        this.feeChart = echarts.init(this.elementRef.nativeElement.querySelector('#chargeFee'));
        this.feeChart.setOption(Constants.getLineEchartOption([], [], []));
    }
}
