import {Component, OnInit, ElementRef}  from '@angular/core';
import * as echarts from 'echarts';

@Component({
    template: `
        <!--主页内容-->
        <div class="home_page">
            <div class="homepage_title">
                <p class="homepage_title_infor">当天交易数据</p>
                <p class="homepage_title_time">截止2016-07-28&nbsp;20:00前</p>
            </div>
            <ul class="trade_data clearfix">
                <li>
                    <p class="data_name">发起订单（笔）</p>
                    <p class="data_figure">167</p>
                </li>
                <li>
                    <p class="data_name">成功订单（笔）</p>
                    <p class="data_figure">125</p>
                </li>
                <li>
                    <p class="data_name">成交金额（元）</p>
                    <p class="data_figure">976</p>
                </li>
                <li>
                    <p class="data_name">订单转化率</p>
                    <p class="data_figure">78%</p>
                </li>
            </ul>
            <div class="homepage_title chart_back">
                <p class="homepage_title_infor">交易量变化(笔)</p>
                <p class="homepage_title_time">2016 年 7 月 18 日 0 点至 24 点</p>
            </div>
            <div class="homepage_title chart_back">
                <p class="homepage_title_infor">交易金额变化(元)</p>
                <p class="homepage_title_time">2016 年 7 月 18 日 0 点至 24 点</p>
            </div>
        </div>
    `
    
})
export class TodayAnalysisComponent implements OnInit {
    myChart: any;
    constructor(private elementRef:ElementRef) {
    }
    ngOnInit() {
        // this.myChart = echarts.init(this.elementRef.nativeElement.querySelector('#main'));
        //
        // let option = {
        //     title: {
        //         text: 'ECharts 入门示例'
        //     },
        //     tooltip: {},
        //     legend: {
        //         data: ['销量']
        //     },
        //     xAxis: {
        //         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        //     },
        //     yAxis: {},
        //     series: [{
        //         name: '销量',
        //         type: 'bar',
        //         data: [5, 20, 36, 10, 10, 20]
        //     }]
        // };
        // this.myChart.setOption(option);
    }
}
