export default [
    // 页面信息
    {
        url: '/api/v1/lyk/user_new_vip_recharge/pageInfo',
        method: 'get',
        response: () => {
            return {
                "status":1,
                "msg":"请求成功",
                "data":{
                    "user_info":{
                        "user_id":20582258,
                        "nick_name":"Peter",
                        "user_img":"https://static_test.3d66.com/public/images/common/defaultHead.jpg"
                    },
                    "nav_list":[{
                        "nav_id":1,
                        "nav_name":"66大会员",
                        "product_list":[{"product_id":10,"product_name":"大会员"}]
                    },{
                        "nav_id":2,
                        "nav_name":"素材会员",
                        "product_list":[{"product_id":8,"product_name":"基础素材会员"},{"product_id":9,"product_name":"超级素材会员"}]
                    },{
                        "nav_id":3,
                        "nav_name":"渲染贵族",
                        "product_list":[{"product_id":3,"product_name":"渲染贵族"}]
                    },{
                        "nav_id":4,
                        "nav_name":"全景VIP",
                        "product_list":[{"product_id":5,"product_name":"全景VIP"},{"product_id":6,"product_name":"大容量VIP"}]
                    },{
                        "nav_id":5,
                        "nav_name":"AI会员",
                        "product_list":[{"product_id":7,"product_name":"AI大会员"}]
                    },{
                        "nav_id":6,
                        "nav_name":"自学贵族",
                        "product_list":[{"product_id":4,"product_name":"自学贵族"}]
                    }]
                }
            }
        }
    },
    // 套包数据
    {
        url: '/api/v1/lyk/user_new_vip_recharge/getPackageData',
        method: 'get',
        response: () => {
            return {
                "status":1,
                "msg":"请求成功",
                "data":{
                    "package_list":[{
                        "package_id":7,
                        "package_name":"1年VIP",
                        "original_price":1699,
                        "rmb_price":699,
                        "dollar_price":0,
                        "default_package":1,
                        "can_use_coupon":1,
                        "is_show_secondary_conversion_activity":0
                    },{
                        "package_id":8,
                        "package_name":"2年会员",
                        "package_tag": "2年+送1年",
                        "original_price":5097,
                        "rmb_price":1398,
                        "dollar_price":0,
                        "default_package":0,
                        "can_use_coupon":1,
                        "is_show_secondary_conversion_activity":0
                    },{
                        "package_id":9,
                        "package_name":"3年会员",
                        "package_tag": "3年+送2年",
                        "original_price":8495,
                        "rmb_price":2097,
                        "dollar_price":0,
                        "default_package":0,
                        "can_use_coupon":1,
                        "is_show_secondary_conversion_activity":0
                    }],
                    "benefit_list":[{
                        "benefit_id":13,
                        "benefit_title":"素材下载满10币",
                        "benefit_subtitle":"随机立减1-50币",
                        "benefit_icon":"https://3d66.oss-cn-hangzhou.aliyuncs.com/lyk4/vip_benefit/20250716/bd9f6a1bb55b3e271c54011ae903e887.png",
                        "is_lyk_unique":1
                    },{
                        "benefit_id":14,
                        "benefit_title":"VIP库素材免费下",
                        "benefit_subtitle":"不限次数",
                        "benefit_icon":"https://3d66.oss-cn-hangzhou.aliyuncs.com/lyk4/vip_benefit/20250716/072c401b999a460f8c5cdbb1d216ab45.png",
                        "is_lyk_unique":1
                    },{
                        "benefit_id":15,
                        "benefit_title":"付费素材重复下载",
                        "benefit_subtitle":"会员期内免费",
                        "benefit_icon":"https://3d66.oss-cn-hangzhou.aliyuncs.com/lyk4/vip_benefit/20250716/6ca4cab06c39f4c602f21cf60171f72b.png",
                        "is_lyk_unique":1
                    },{
                        "benefit_id":16,
                        "benefit_title":"灵感案例免费下载",
                        "benefit_subtitle":"",
                        "benefit_icon":"https://3d66.oss-cn-hangzhou.aliyuncs.com/lyk4/vip_benefit/20250716/9ac53c6328b4265987ccc4d3b19eaf9d.png",
                        "is_lyk_unique":0
                    },{
                        "benefit_id":17,
                        "benefit_title":"材质免费下载",
                        "benefit_subtitle":"",
                        "benefit_icon":"https://3d66.oss-cn-hangzhou.aliyuncs.com/lyk4/vip_benefit/20250716/f9ebc5134f439d19ac8344486fbece61.png",
                        "is_lyk_unique":0
                    },{
                        "benefit_id":18,
                        "benefit_title":"批量下载",
                        "benefit_subtitle":"",
                        "benefit_icon":"https://3d66.oss-cn-hangzhou.aliyuncs.com/lyk4/vip_benefit/20250716/3be96c1ce716fbc926654d943c27cb03.png",
                        "is_lyk_unique":0
                    }],
                    // "more_benefits_url":"",
                    "more_benefits_url":"https://3d66.oss-cn-hangzhou.aliyuncs.com/lyk4/vip_benefit/20250716/c9667859dff8b3ab6d26bd28c78fce8c.png",
                    "vip_info":{
                        "is_xuanran_noble":1,
                        "xuanran_noble_endtime":1753977600,
                        "xuanran_noble_remainder_days":15,
                        "is_zixue_noble":1,
                        "zixue_noble_endtime":1753977600,
                        "zixue_noble_remainder_days":15,
                        "is_base_vr_vip":1,
                        "base_vr_vip_endtime":1753977600,
                        "base_vr_vip_remainder_days":15,
                        "is_large_capacity_vr_vip":1,
                        "large_capacity_vr_vip_endtime":1754064000,
                        "large_capacity_vr_vip_remainder_days":16,
                        "is_ai_vip":1,
                        "ai_vip_endtime":1752940800,
                        "ai_vip_remainder_days":3,
                        "is_base_res_noble":1,
                        "base_res_noble_endtime":1753977600,
                        "base_res_noble_remainder_days":15,
                        "is_super_res_noble":1,
                        "super_res_noble_endtime":1753977600,
                        "super_res_noble_remainder_days":15,
                        "is_ll_vip":0,
                        "ll_vip_endtime":1752940800,
                        "ll_vip_remainder_days":3
                    },
                    "base_pay_info":{
                        "order_type":47,
                        "cz_source":1,
                        "cz_entrance":0,
                        "cz_coupon_channel":2,
                        "cz_coupon_vip_type": 3
                    },
                    "pay_type_list":[{
                        "pay_type":1,
                        "pay_name":"微信支付",
                        "cz_type":0,
                        "is_current":1
                    },{
                        "pay_type":2,
                        "pay_name":"支付宝",
                        "cz_type":1,
                        "is_current":0
                    },{
                        "pay_type":3,
                        "pay_name":"PayPal",
                        "cz_type":3,
                        "is_current":0
                    }],
                    // "pay_type_list":[{
                    //     "pay_type": 100,
                    //     "pay_name": "支付宝",
                    //     "cz_type": 2,
                    //     "is_current": 1
                    // },
                    // {
                    //     "pay_type": 3,
                    //     "pay_name": "PayPal",
                    //     "cz_type": 3,
                    //     "is_current": 0
                    // }],
                    "secondary_conversion_activity_remainder":0,
                    "strategy_id":1,
                    "upgrade_info": {
                        "upgrade_deduction_price": 69.68, //抵扣人民币金额，当>0时可显示折算价格
                        "upgrade_deduction_dollar_price": 34.84, //抵扣美元金额，当>0时可显示折算价格
                        "deduction_all_vip": 1, //是否扣除全站vip：0-否、1-是
                        "deduction_lg_vip": 1, //是否扣除灵感会员：0-否、1-是
                        "deduction_sc_vip": 1 //是否扣除素材会员：0-否、1-是
                    }
                    // "upgrade_info": null
                }
            }
        }
    },
    // 优惠券数据
    {
        url: '/pay/common/getCouponInfo',
        method: 'post',
        response: () => {
            return  {
                "code":1,
                "msg":"请求成功",
                "data": [
                    {
                        "coupon_id": 35722467,
                        "coupon_title": "50元大会员代金券",
                        "coupon_info": "溜云库开通66大会员可用",
                        "use_limit_price": "699.00",
                        "use_limit_vip": 0,
                        "coupon_type": 99,
                        "coupon_status": 0,
                        "user_id": 180019294,
                        "coupon_price": "50.00",
                        "coupon_start_time": 1755593146,
                        "coupon_end_time": "2025.09.18到期",
                        "link_url": "",
                        "type": 1,
                        "use_type": 32,
                        "num_type": 6,
                        "get_source": 2,
                        "lyk_url": "",
                        "task_total_process": 0,
                        "task_current_process": 0,
                        "task_id": 0,
                        "parent_coupon_id": 1468,
                        "show_countdown": 0,
                        "sortPrice": "50.00",
                        "unit": "元",
                        "coupon_countdown": 2529802
                    },
                    {
                        "coupon_id": 35722465,
                        "coupon_title": "20元超级素材会员券",
                        "coupon_info": "溜云库开通超级素材会员可用",
                        "use_limit_price": "199.00",
                        "use_limit_vip": 0,
                        "coupon_type": 99,
                        "coupon_status": 0,
                        "user_id": 180019294,
                        "coupon_price": "20.00",
                        "coupon_start_time": 1755592394,
                        "coupon_end_time": "2025.08.21到期",
                        "link_url": "",
                        "type": 1,
                        "use_type": 32,
                        "num_type": 6,
                        "get_source": 2,
                        "lyk_url": "",
                        "task_total_process": 0,
                        "task_current_process": 0,
                        "task_id": 0,
                        "parent_coupon_id": 1467,
                        "show_countdown": 1,
                        "sortPrice": "20.00",
                        "unit": "元",
                        "coupon_countdown": 114628
                    },
                    {
                        "coupon_id": 35722466,
                        "coupon_title": "20元超级素材会员券",
                        "coupon_info": "溜云库开通超级素材会员可用",
                        "use_limit_price": "199.00",
                        "use_limit_vip": 0,
                        "coupon_type": 99,
                        "coupon_status": 0,
                        "user_id": 180019294,
                        "coupon_price": "20.00",
                        "coupon_start_time": 1755593092,
                        "coupon_end_time": "2025.08.21到期",
                        "link_url": "",
                        "type": 1,
                        "use_type": 32,
                        "num_type": 6,
                        "get_source": 2,
                        "lyk_url": "",
                        "task_total_process": 0,
                        "task_current_process": 0,
                        "task_id": 0,
                        "parent_coupon_id": 1467,
                        "show_countdown": 1,
                        "sortPrice": "20.00",
                        "unit": "元",
                        "coupon_countdown": 114628
                    },
                    {
                        "coupon_id": 35722464,
                        "coupon_title": "10元超级素材会员优惠券",
                        "coupon_info": "溜云库充值超级素材会员可用",
                        "use_limit_price": "199.00",
                        "use_limit_vip": 0,
                        "coupon_type": 99,
                        "coupon_status": 0,
                        "user_id": 180019294,
                        "coupon_price": "10.00",
                        "coupon_start_time": 1755592025,
                        "coupon_end_time": "2025.08.21到期",
                        "link_url": "",
                        "type": 1,
                        "use_type": 32,
                        "num_type": 6,
                        "get_source": 8,
                        "lyk_url": "",
                        "task_total_process": 0,
                        "task_current_process": 0,
                        "task_id": 0,
                        "parent_coupon_id": 1475,
                        "show_countdown": 0,
                        "sortPrice": "10.00",
                        "unit": "元",
                        "coupon_countdown": 114628
                    }
                ],
                "url":"",
                "wait":3
            }
        }
    },
    {
        url: '/payment/do_payment',
        method: 'post',
        response: () => {
            return {
                "status": 1,
                "msg": "success",
                "data": {
                    "jkma": "25052513573746000149",
                    "payurl": "weixinlike://wxpay/bizpayurl?pr=hJh5vc6z3",
                    "unionPay": 0,
                    "qrcode": "weixinlike://wxpay/bizpayurl?pr=hJh5vc6z3"
                },
                "code": 1
            }
        },
    },
    {
        url: '/pay/check_pay',
        method: 'post',
        response: () => {
            return {
                "status": 200,
                "msg": "订单待支付！"
            }
        },
    },
];
