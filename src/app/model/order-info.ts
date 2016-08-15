export class OrderInfoModel {
    public id: number;
    public appId: number;
    public channel: string;
    public outTradeNo: string;
    public feeType: string;
    public totalFee: number;
    public serverIp: string;
    public clientIp: string;
    public subject: string;
    public body: string;
    public returnUrl: string;
    public analysis: string;
    public attach: string;
    public description: string;
    public refund: boolean;

    public channelUser: string;
    public channelTradeNo: string;
    public createTime: number;
    public orderTime: number;
    public payTime: number;
}