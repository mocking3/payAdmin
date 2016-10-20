export class RefundOrderInfoModel {
    public id:number;
    public appId:number;
    public orderId:number;
    public channel:string;
    public outTradeNo:string;
    public outRefundNo:string;
    public refundFee:number;
    public feeType:string;
    public refundTime:number;
    public refundReson:string;
    public channelRefundNo:string;
}