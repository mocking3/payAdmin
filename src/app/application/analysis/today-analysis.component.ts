import {Component, OnInit, ElementRef}  from '@angular/core';
import * as echarts from 'echarts';

@Component({
    template: `
    <h2>当天交易数据</h2>
    <div id="main" style="width: 600px;height:400px;"></div>
    `
})
export class TodayAnalysisComponent implements OnInit {
    myChart: any;
    constructor(private elementRef:ElementRef) {
    }
    ngOnInit() {
        this.myChart = echarts.init(this.elementRef.nativeElement.querySelector('#main'));

        let option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        this.myChart.setOption(option);
    }
}
