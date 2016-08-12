import {Component, OnInit, OnDestroy, ElementRef}  from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as echarts from 'echarts';
import {AnalysisService} from "./analysis.service";

@Component({
    template: `
        <!--主页内容-->
        <div class="home_page">
            <div class="homepage_title">
                <p class="drawback_order_title">当天交易数据</p>
                <!--<p class="homepage_title_time">截止2016-07-28&nbsp;20:00前</p>-->
            </div>
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
                <p class="homepage_title_time">{{currentDate | date:'yyyy 年 MM 月 dd 日'}} 0 点至 24 点</p>
                <div id="chargeCount" style="width: 90%;height:400px;"></div>
            </div>
            <div class="homepage_title chart_back">
                <p class="homepage_title_infor">交易金额变化(元)</p>
                <p class="homepage_title_time">{{currentDate | date:'yyyy 年 MM 月 dd 日'}} 0 点至 24 点</p>
                <div id="chargeFee" style="width: 90%;height:400px;"></div>
            </div>
        </div>
    `,
    providers: [AnalysisService]
    
})
export class TodayAnalysisComponent implements OnInit, OnDestroy {
    message: string;
    currentDate: any = new Date();
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

            this.analysisService.getDataSummary(this.appId, this.currentDate).subscribe(
                data => this.dataSummary = data,
                error => this.message = <any>error
            );
            this.analysisService.getChargeChangeWithCount(this.appId, this.currentDate).subscribe(
                data => {
                    let preOrderData: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
                        orderData: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,];
                    for(let i=0; i<data.preOrder.length; i++) {
                        preOrderData[data.preOrder[i].hours] = data.preOrder[i].total;
                    }
                    for(let i=0; i<data.order.length; i++) {
                        orderData[data.order[i].hours] = data.order[i].total / 100;
                    }
                    this.initCountChart(preOrderData, orderData);
                },
                error => this.message = <any>error
            );
            this.analysisService.getChargeChangeWithFee(this.appId, this.currentDate).subscribe(
                data => {
                    let orderData: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,];
                    for(let i=0; i<data.length; i++) {
                        orderData[data[i].hours] = data[i].total;
                    }
                    this.initFeeChart(orderData);
                },
                error => this.message = <any>error
            );
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    initCountChart(preOrderData: number[], orderData: number[]) {
        this.countChart = echarts.init(this.elementRef.nativeElement.querySelector('#chargeCount'));

        let option = {
            // title: {
            //     text: '交易量变化(笔)'
            // },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data: ['发起订单', '成功订单']
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
                    data : ['0时', '1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时','13时','14时',
                        '15时', '16时','17时','18时','19时','20时','21时','22时','23时']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'发起订单',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:preOrderData
                },
                {
                    name:'成功订单',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:orderData
                }
            ]
        };
        this.countChart.setOption(option);
    }

    initFeeChart(orderData: number[]) {
        this.countChart = echarts.init(this.elementRef.nativeElement.querySelector('#chargeFee'));

        let option = {
            // title: {
            //     text: '交易量变化(笔)'
            // },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                // data: ['金额']
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
                    data : ['0时', '1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时','13时','14时',
                        '15时', '16时','17时','18时','19时','20时','21时','22时','23时']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'金额',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:orderData
                }
            ]
        };
        this.countChart.setOption(option);
    }
}
