export interface payParamsType {
    package_id: number,
    coupon_id: number, // 无
    activity_id: number,
    cz_type: number,// 聚合支付 0， 其他支付 1(wechat), 2(ali), 3(paypal)
    order_type: number,
    cz_source: number,
    qrcode_size: string,
    entrance: string,
    lyk_version: string,
    is_union: number, // 是否聚合支付
    activate_source: string,
}
export interface External {
    Recharge: (type: 0|1|2|3|4) => void; // 充值弹窗：0 溜币充值（下载币）  1 渲染贵族  2 素材贵族  3 VIP  4 渲染币
    CloseLykWindow: () => void; // 关闭弹窗
    ElementClick: (id: string) => void; // 全埋点
    GoOtherModule: (type: 1|2|3) => void; // 广告跳转
    OpenUrl: (url: string) => void; // 跳转链接
}