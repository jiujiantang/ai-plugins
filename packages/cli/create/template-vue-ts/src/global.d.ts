interface payParamsType {
    package_id: number,
    coupon_id: number, // 无
    activity_id: number,
    cz_type: number,// 聚合支付 0， 其他支付 1(wechat), 2(ali), 3(paypal)
    order_type: number,
    cz_source: number,
    entrance: number,
    plan_id: number,// 无
    benefits: string,
    vip_type: string,
    qrcode_size: string,
    lyk_version: string,
    is_union: number, // 是否聚合支付
    payvisit_source: number,// 无
}
interface External {
    Recharge: (type: 0|1|2|3|4) => void; // 充值弹窗：0 溜币充值（下载币）  1 渲染贵族  2 素材贵族  3 VIP  4 渲染币
    CloseLykWindow: () => void; // 关闭弹窗
    ElementClick: (id: string) => void; // 全埋点
    GoOtherModule: (type: 1|2|3) => void; // 广告跳转
}
type LykFnTypes = keyof External;

// Window 是一个 TypeScript 或 JavaScript 中的接口（或类型），用于描述 window 对象的类型。
interface Window {
    _lib_pay: {
        clearTabCheckPay: () => void;
        paymentFcun: (params:payParamsType|null, callback: ()=>void) => void;
    },
    _lib_login: {
        login: () => void;
    },
    _lib_sc: {
        trackEvent: (eventName: string, params: Record<string, any[]>|{}) => void;
    },
    external: External;
}