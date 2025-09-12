// 优惠券信息(后端转前端结构)
export type CouponApiData = {
    coupon_id: number;
    coupon_title: string;
    coupon_info: string;
    use_limit_price: string;
    use_limit_vip: string;
    coupon_type: number;
    coupon_status: number;
    user_id: number;
    coupon_price: string;
    coupon_start_time: number;
    coupon_end_time_v2: number;
    coupon_end_time: string;
    link_url: string;
    type: number;
    use_type: number;
    num_type: number;
    get_source: number;
    lyk_url: string;
    task_total_process: number;
    task_current_process: number;
    task_id: number;
    parent_coupon_id: number;
    sortPrice: string;
    unit: string;
    show_countdown: number;
    coupon_countdown: number;
}[];
export type Coupons = {
    key: number;
    coupon_title: string;
    coupon_info?: string;
    use_limit_price?: string;
    use_limit_vip?: string;
    coupon_type?: number;
    coupon_status?: number;
    user_id?: number;
    coupon_price?: string;
    coupon_start_time?: number;
    coupon_end_time_v2?: number;
    coupon_end_time?: string;
    link_url?: string;
    type?: number;
    use_type?: number;
    num_type?: number;
    get_source?: number;
    lyk_url?: string;
    task_total_process?: number;
    task_current_process?: number;
    task_id?: number;
    parent_coupon_id?: number;
    sortPrice: string;
    unit?: string;
    show_countdown?: number;
    coupon_countdown?: number;
}[];
export function adaptCoupon(data: CouponApiData): Coupons {
    return data.map((coup: CouponApiData[number],index: number) => ({
        key: coup.coupon_id,
        coupon_title: coup.coupon_title,
        coupon_info: coup.coupon_info,
        use_limit_price: coup.use_limit_price,
        use_limit_vip: coup.use_limit_vip,
        coupon_type: coup.coupon_type,
        coupon_status: coup.coupon_status,
        user_id: coup.user_id,
        coupon_price: coup.coupon_price,
        coupon_start_time: coup.coupon_start_time,
        coupon_end_time_v2: coup.coupon_end_time_v2,
        coupon_end_time: coup.coupon_end_time,
        link_url: coup.link_url,
        type: coup.type,
        use_type: coup.use_type,
        num_type: coup.num_type,
        get_source: coup.get_source,
        lyk_url: coup.lyk_url,
        task_total_process: coup.task_total_process,
        task_current_process: coup.task_current_process,
        task_id: coup.task_id,
        parent_coupon_id: coup.parent_coupon_id,
        sortPrice: coup.sortPrice,
        unit: coup.unit,
        show_countdown: coup.show_countdown,
        coupon_countdown: coup.coupon_countdown,
    }));
}
