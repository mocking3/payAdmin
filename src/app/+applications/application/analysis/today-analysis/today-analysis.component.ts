import {Component, OnInit, OnDestroy, ElementRef}  from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as echarts from 'echarts';
import * as moment from 'moment';
import Moment = moment.Moment;

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

    constructor(private router: Router,
                private route: ActivatedRoute,
                private elementRef:ElementRef,
                private analysisService: AnalysisService) {
    }

    ngOnInit() {
        this.sub = this.router.routerState.parent(this.route).params.subscribe(params => {
            this.appId = +params['id'];

            this.analysisService.getDataSummary(this.appId, this.currentDate.format('YYYY/MM/DD'),
                                        this.currentDate.format('YYYY/MM/DD')).subscribe(
                data => this.dataSummary = data,
                error => this.message = <any>error
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
                    this.initCountChart(date, preOrderData, orderData);
                },
                error => this.message = <any>error
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
                    this.initFeeChart(date, orderData, refundOrderData);
                },
                error => this.message = <any>error
            );
        });
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
}
