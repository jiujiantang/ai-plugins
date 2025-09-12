// 套包信息(后端转前端结构)
export interface PackageApiData {
    package_list:{
        package_id: number;
        package_name: string;
        package_tag?: string;
        original_price: number;
        rmb_price: number;
        dollar_price: number;
        default_package: number;
        can_use_coupon: number;
        is_show_secondary_conversion_activity: number;
    }[],
    benefit_list: {
        benefit_id: number;
        benefit_title: string;
        benefit_subtitle: string;
        benefit_icon: string;
        is_lyk_unique: number;
    }[],
    more_benefits_url: string;
    vip_info:{
        is_xuanran_noble: number; // 渲染贵族
        xuanran_noble_endtime: number;
        xuanran_noble_remainder_days: number; // 渲染贵族剩余时间
        is_zixue_noble: number; // 自学贵族
        zixue_noble_endtime: number;
        zixue_noble_remainder_days: number; // 自学贵族剩余时间
        is_base_vr_vip: number; // 全景VIP
        base_vr_vip_endtime: number;
        base_vr_vip_remainder_days: number; // 全景VIP剩余时间
        is_large_capacity_vr_vip: number;// 大容量VIP
        large_capacity_vr_vip_endtime: number;
        large_capacity_vr_vip_remainder_days: number; // 大容量VIP剩余时间
        is_ai_vip: number; // ai大会员
        ai_vip_endtime: number;
        ai_vip_remainder_days: number;// ai大会员剩余时间
        is_base_res_noble: number;// 基础素材会员
        base_res_noble_endtime: number;
        base_res_noble_remainder_days: number;// 基础素材会员剩余时间
        is_super_res_noble: number;// 超级素材会员
        super_res_noble_endtime: number;
        super_res_noble_remainder_days: number;// 超级素材会员剩余时间
        is_ll_vip: number; // 66大会员
        ll_vip_endtime: number;
        ll_vip_remainder_days: number; // 66大会员剩余时间
    },
    base_pay_info:{
        order_type: number;
        cz_source: number;
        cz_entrance: number;
        cz_coupon_channel: number;
        cz_coupon_vip_type: number;
    },
    pay_type_list:{
        pay_type: number,
        pay_name: string,
        cz_type: number,
        is_current: number
    }[],
    secondary_conversion_activity_remainder: number,
    strategy_id?: number,
    upgrade_info: {
        upgrade_deduction_price: number, //抵扣人民币金额，当>0时可显示折算价格
        upgrade_deduction_dollar_price: number, //抵扣美元金额，当>0时可显示折算价格
        deduction_all_vip: number, //是否扣除全站vip：0-否、1-是
        deduction_lg_vip: number, //是否扣除灵感会员：0-否、1-是
        deduction_sc_vip: number //是否扣除素材会员：0-否、1-是
    } | null
}
export interface Package {
    package:{
        key: number;
        package_name: string;
        package_tag: string | undefined;
        original_price: number;
        rmb_price: number;
        dollar_price: number;
        default_package: number;
        can_use_coupon: number;
        is_show_secondary_conversion_activity: number;
    }[],
    rights: {
        key: number;
        name: string;
        sub: string;
        benefit_icon: string;
        is_lyk_unique: number;
    }[],
    more_benefits_url: string;
    vip_info:{
        is_xuanran_noble: number;
        xuanran_noble_endtime: number;
        xuanran_noble_remainder_days: number;
        is_zixue_noble: number;
        zixue_noble_endtime: number;
        zixue_noble_remainder_days: number;
        is_base_vr_vip: number;
        base_vr_vip_endtime: number;
        base_vr_vip_remainder_days: number;
        is_large_capacity_vr_vip: number;
        large_capacity_vr_vip_endtime: number;
        large_capacity_vr_vip_remainder_days: number;
        is_ai_vip: number;
        ai_vip_endtime: number;
        ai_vip_remainder_days: number;
        is_base_res_noble: number;
        base_res_noble_endtime: number;
        base_res_noble_remainder_days: number;
        is_super_res_noble: number;
        super_res_noble_endtime: number;
        super_res_noble_remainder_days: number;
        is_ll_vip: number;
        ll_vip_endtime: number;
        ll_vip_remainder_days: number;
    },
    base_pay_info:{
        order_type: number;
        cz_source: number;
        cz_entrance: number;
        cz_coupon_channel: number;
        cz_coupon_vip_type: number;
    },
    pay_type_list:{
        pay_type: number, // 1: 微信; 2: 支付宝; 3: PayPal; 100: 聚合;
        pay_name: string,
        cz_type: number, // 0: 微信; 1: 支付宝; 2: 聚合; 3: PayPal
        is_current: number
    }[],
    secondary_conversion_activity_remainder: number,
    strategy_id: number | undefined,
    upgrade_info: {
        upgrade_deduction_price: number,
        upgrade_deduction_dollar_price: number,
        deduction_all_vip: number,
        deduction_lg_vip: number,
        deduction_sc_vip: number
    } | null
}
export function adaptPackage(data: PackageApiData): Package {
    return {
        package: data.package_list.map((pkg:PackageApiData["package_list"][number],index: number) => ({
            key: pkg.package_id,
            package_name: pkg.package_name,
            package_tag: pkg?.package_tag ? pkg.package_tag : undefined,
            original_price: pkg.original_price,
            rmb_price: pkg.rmb_price,
            dollar_price: pkg.dollar_price,
            default_package: pkg.default_package,
            can_use_coupon: pkg.can_use_coupon,
            is_show_secondary_conversion_activity: pkg.is_show_secondary_conversion_activity,
        })),
        rights: data.benefit_list.map((benefit, index) => ({
            key: benefit.benefit_id,
            name: benefit.benefit_title,
            sub: benefit.benefit_subtitle,
            benefit_icon: benefit.benefit_icon,
            is_lyk_unique: benefit.is_lyk_unique
        })),
        more_benefits_url: data.more_benefits_url,
        vip_info: data.vip_info,
        base_pay_info: data.base_pay_info,
        pay_type_list: data.pay_type_list,
        secondary_conversion_activity_remainder: data.secondary_conversion_activity_remainder,
        strategy_id: data?.strategy_id ? data.strategy_id : undefined,
        upgrade_info: data.upgrade_info,
    };
}
