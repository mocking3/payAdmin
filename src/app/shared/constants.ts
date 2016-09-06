import {NameValue} from './models';
export class Constants {
    static getServerUrl = function(): string {
        if (process.env.ENV === 'production') {
            return 'https://localhost:7082';
        } else {
            return 'http://localhost:7082';
        }
    };

    static CHANNEL:any = {
        WX: '微信',
        WX_APP: '微信APP', // 微信手机原生APP支付
        WX_NATIVE: '微信扫码', // 微信公众号二维码支付
        WX_JSAPI: '微信公众号', // 微信公众号支付+
        WX_WAP: '微信H5', // 微信H5支付

        ALI: '支付宝',
        ALI_APP: '支付宝APP', // 支付宝手机原生APP支付
        ALI_WEB: '支付宝PC', // 支付宝PC网页支付
        ALI_QRCODE: '支付宝扫码', // 支付宝内嵌二维码支付
        ALI_OFFLINE_QRCODE: '支付宝线下二维码', // 支付宝线下二维码支付
        ALI_WAP: '支付宝H5' // 支付宝移动网页支付
    };

    static getPChannel = function (channel:string):string {
        return channel.substring(0, channel.indexOf('_'));
    };

    static getLineEchartOption = function (xAxisData: string[], seriesData: number[][], legendData: string[]) {
        let series: any = [];
        for (let i=0; i<legendData.length; i++) {
            let obj = {
                name: legendData[i],
                type:'line',
                // stack: '总量',
                // areaStyle: {normal: {}},
                smooth: true,
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
                show: true,
                feature: {
                    magicType: {show: true, type: ['stack', 'tiled']},
                    saveAsImage: {show: true}
                }
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
    };

    static getPieEchartOption = function (serie1: NameValue[], serie2: NameValue[], legendData: string[]) {
        return {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:legendData
            },
            series: [
                {
                    name:'渠道',
                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:serie1
                },
                {
                    name:'渠道',
                    type:'pie',
                    radius: ['40%', '55%'],

                    data:serie2
                }
            ]
        };
    };
    
}