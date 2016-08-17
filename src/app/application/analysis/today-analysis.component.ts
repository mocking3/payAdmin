import {Component, OnInit, OnDestroy, ElementRef}  from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as echarts from 'echarts';
import * as moment from 'moment';
import {AnalysisService} from "./analysis.service";
import Moment = moment.Moment;

@Component({
    template: `
        <!--主页内容-->
        <div class="pannel">
            <p class="common_title">当天交易数据</p>
            <ul class="trade_data clearfix">
                <li>
                    <p class="data_name">发起订单（笔）</p>
                    <p class="data_figure">{{dataSummary.preOrderCount}}</p>
                </li>
                <li>
                    <p class="data_name">成功订单（笔）</p>
                    <p class="data_figure">{{dataSummary.orderCount}}</p>
                </li>
                <li>
                    <p class="data_name">成交金额（元）</p>
                    <p class="data_figure">{{dataSummary.orderTotalFee}}</p>
                </li>
                <li>
                    <p class="data_name">订单转化率</p>
                    <p class="data_figure">{{dataSummary.conversion*100}}%</p>
                </li>
            </ul>
            <div class="homepage_title chart_back">
                <p class="homepage_title_infor">交易量变化(笔)</p>
                <p class="homepage_title_time">{{currentDate.toDate() | date:'yyyy 年 MM 月 dd 日'}} 0 点至 24 点</p>
                <div id="chargeCount" style="width: 90%;height:400px;"></div>
            </div>
            <div class="homepage_title chart_back">
                <p class="homepage_title_infor">交易金额变化(元)</p>
                <p class="homepage_title_time">{{currentDate.toDate() | date:'yyyy 年 MM 月 dd 日'}} 0 点至 24 点</p>
                <div id="chargeFee" style="width: 90%;height:400px;"></div>
            </div>
        </div>
    `,
    styles: [`
        /*主页内容*/
        .home_page{
            width: 100%;
        }
        .homepage_title{
            width: 100%;
            background-color: #fafbfe;
        }
        .homepage_title_infor{
            font-size: 20px;
            line-height: 25px;
            color: #354285;
            padding-top: 28px;
            margin-left: 25px;
            font-weight: bold;
        }
        .homepage_title_time{
            font-size: 14px;
            line-height: 15px;
            color: #354285;
            margin-top: 6px;
            margin-left: 25px;
        }
        .trade_data{
            width: 97%;
            margin: 0 auto;
            margin-top: 30px;
            padding-bottom: 28px;
            border-bottom: 1px solid #eef1f9;
        }
        .trade_data li{
            float: left;
            width: 100px;
            margin-right: 60px;
        }
        .data_name{
            font-size: 14px;
            line-height: 15px;
            color: #4696e4;
        }
        .data_figure{
            width: 80px;
            font-size: 20px;
            line-height: 20px;
            color: #354285;
            margin-top: 15px;
            text-align: center;
        }
        .chart_back{
            background-color: #ffffff;
        }
    `],
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
                                        this.currentDate.clone().add(1, 'days').format('YYYY/MM/DD')).subscribe(
                data => this.dataSummary = data,
                error => this.message = <any>error
            );
            this.analysisService.getChargeChangeWithCount(this.appId, this.currentDate.format('YYYY/MM/DD'),
                                        this.currentDate.clone().add(1, 'days').format('YYYY/MM/DD')).subscribe(
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
            this.analysisService.getChargeChangeWithFee(this.appId, this.currentDate.format('YYYY/MM/DD'),
                                        this.currentDate.clone().add(1, 'days').format('YYYY/MM/DD')).subscribe(
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
