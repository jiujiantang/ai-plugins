export default [
    // 抽奖信息
    {
        url: '/api/v1/lyk/twelve_anniversary_draw_activity/getPageInfo',
        method: 'post',
        response: () => {
            return {
                "status":1,
                "msg":"请求成功",
                "data":{
                    "today_consume_coin_total":0, //今日消耗币总数
                    "can_exchange_draw_num":0,//可兑换抽奖次数
                    "coin_remainder_draw_num":0, //消耗币_剩余抽奖次数（左侧抽奖）
                    "coin_draw_prize_list":[
                        {
                            "prize_id": 1, //奖品ID
                            "prize_name":"1个下载币", //奖品名称
                            "prize_type":1, //奖品类型：1-下载币、2-贵族充值券、3-币种充值券、4-实物奖品
                            "prize_value":1, //奖品面值，prize_type=1表示币数量；当prize_type=2、3表示优惠券id；当 prize_type=4 表示实物奖品数量
                        },{
                            "prize_id": 2,
                            "prize_name":"18个下载币",
                            "prize_type":1,
                            "prize_value":18,
                        },{
                            "prize_id": 3,
                            "prize_name":"28个下载币",
                            "prize_type":1,
                            "prize_value":28,
                        },{
                            "prize_id": 4,
                            "prize_name":"88个下载币",
                            "prize_type":1,
                            "prize_value":88,
                        },{
                            "prize_id": 5,
                            "prize_name":"全站&贵族满99减10元券",
                            "prize_type":2,
                            "prize_value":"不限",
                        },{
                            "prize_id": 6,
                            "prize_name":"币种充值满300元减10元券",
                            "prize_type":3,
                            "prize_value":"不限",
                        },{
                            "prize_id": 7,
                            "prize_name":"京东Tritan运动水杯",
                            "prize_type":4,
                            "prize_value":10,
                        },{
                            "prize_id": 8,
                            "prize_name":"京东艺术家联名鼠标垫",
                            "prize_type":4,
                            "prize_value":10,
                        }
                    ],
                    "recharge_remainder_draw_num":13,//充值_剩余抽奖次数（右侧抽奖）
                    "recharge_draw_prize_list":[{
                        "prize_id": 9,
                        "prize_name":"28下载币",//奖品名称
                        "prize_type":1,//奖品类型：1-下载币、2-贵族充值券、3-币种充值券、4-实物奖品
                        "prize_value":"28", //奖品面值，根据 prize_type 不同而不同。当 prize_type=1表示币数量；当prize_type=2、3表示优惠券id；当 prize_type=4 表示实物奖品数量
                    },{
                        "prize_id": 10,
                        "prize_name":"38下载币",
                        "prize_type":1,
                        "prize_value":"38",
                    },{
                        "prize_id": 11,
                        "prize_name":"188下载币",
                        "prize_type":1,
                        "prize_value":50,
                    },{
                        "prize_id": 12,
                        "prize_name":"1888下载币",
                        "prize_type":1,
                        "prize_value":10,
                    },{
                        "prize_id": 13,
                        "prize_name":"满500减50充值券",
                        "prize_type":3,
                        "prize_value":"不限",
                    },{
                        "prize_id": 14,
                        "prize_name":"小米无线鼠标",
                        "prize_type":4,
                        "prize_value":5,
                    },{
                        "prize_id": 15,
                        "prize_name":"京东Tritan运动水杯",
                        "prize_type":4,
                        "prize_value":10,
                    },{
                        "prize_id": 16,
                        "prize_name":"京东棉花抱枕",
                        "prize_type":4,
                        "prize_value":10,
                    }]
                }
            }
        }
    },
    // 抽奖
    {
        url: '/api/v1/lyk/twelve_anniversary_draw_activity/draw',
        method: 'post',
        response: () => {
            return {
                "status":1,
                "msg":"请求成功",
                "data":{
                    "prize_id":16, // 左侧 1~8； 右侧 9~16
                    "prize_log_id":9
                }
            }
        }
    },
    // 收件地址
    {
        url: '/api/v1/lyk/twelve_anniversary_draw_activity/savePrizeAddress',
        method: 'post',
        response: () => {
            return {
                "status":1,
                "msg":"请求成功",
                "data":null
            }
        }
    },
    // 我的奖品列表
    {
        url: '/api/v1/lyk/twelve_anniversary_draw_activity/getUserPrize',
        method: 'post',
        response: () => {
            return {
                "status": 1,
                "msg": "请求成功",
                "data": [
                    {
                        "prize_id": 8,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "京东联名鼠标垫",
                        "prize_log_id": 211,
                        "prize_type": 4
                    },
                    {
                        "prize_id": 8,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "京东联名鼠标垫",
                        "prize_log_id": 210,
                        "prize_type": 4
                    },
                    {
                        "prize_id": 1,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "1下载币",
                        "prize_log_id": 209,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 8,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "京东联名鼠标垫",
                        "prize_log_id": 208,
                        "prize_type": 4
                    },
                    {
                        "prize_id": 7,
                        "receive_user": "测试",
                        "receive_phone": "13266837916",
                        "receive_address": "测试测试测试测试测试测试测试",
                        "prize_name": "京东Tritan运动水杯",
                        "prize_log_id": 197,
                        "prize_type": 4
                    },
                    {
                        "prize_id": 1,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "1下载币",
                        "prize_log_id": 194,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 1,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "1下载币",
                        "prize_log_id": 193,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 1,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "1下载币",
                        "prize_log_id": 192,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 1,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "1下载币",
                        "prize_log_id": 191,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 1,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "1下载币",
                        "prize_log_id": 190,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 1,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "1下载币",
                        "prize_log_id": 189,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 1,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "1下载币",
                        "prize_log_id": 188,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 1,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "1下载币",
                        "prize_log_id": 187,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 1,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "1下载币",
                        "prize_log_id": 186,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 1,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "1下载币",
                        "prize_log_id": 185,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 1,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "1下载币",
                        "prize_log_id": 184,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 1,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "1下载币",
                        "prize_log_id": 183,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 5,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "会员开通减10元券",
                        "prize_log_id": 182,
                        "prize_type": 2
                    },
                    {
                        "prize_id": 1,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "1下载币",
                        "prize_log_id": 181,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 1,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "1下载币",
                        "prize_log_id": 180,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 9,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "28下载币",
                        "prize_log_id": 179,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 10,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "38下载币",
                        "prize_log_id": 178,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 10,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "38下载币",
                        "prize_log_id": 177,
                        "prize_type": 1
                    },
                    {
                        "prize_id": 13,
                        "receive_user": "",
                        "receive_phone": "",
                        "receive_address": "",
                        "prize_name": "充值满500减50元券",
                        "prize_log_id": 176,
                        "prize_type": 3
                    }
                ]
            }
        }
    },
    // 兑换次数
    {
        url: '/api/v1/lyk/twelve_anniversary_draw_activity/exchangeDrawNum',
        method: 'post',
        response: () => {
            return {
                "status":1,
                "msg":"请求成功",
                "data":null
            }
        }
    },
    // 限购
    {
        url: '/api/v1/lyk/twelve_anniversary_purchase_limit_activity/getPageInfo',
        method: 'get',
        response: () => {
            return {
                "status":1,
                "msg":"请求成功",
                "data":[
                    {
                        "product_id": 1, //商品id
                        "product_name": "100下载币", //商品名称
                        "product_type": 1, //商品类型：1-币、2-vip
                        "product_price": "10", //价格
                        "product_status": 0, //商品状态：0-未开始、 1-可购买、2-已购买、3-已结束
                    },
                    {
                        "product_id": 2,
                        "product_name": "120下载币",
                        "product_type": 1,
                        "product_price": "12",
                        "product_status": 1
                    },
                    {
                        "product_id":3,
                        "product_name": "150下载币",
                        "product_type": 1,
                        "product_price": "15",
                        "product_status": 2
                    },
                    {
                        "product_id": 4,
                        "product_name": "全站VIP会员1日卡",
                        "product_type": 2,
                        "product_price": "1",
                        "product_status": 3
                    },
                    {
                        "product_id": 5,
                        "product_name": "全站VIP会员7日卡",
                        "product_type": 2,
                        "product_price": "10",
                        "product_status": 1
                    },
                ]
            }
        }
    },
    {
        url: '/api/v1/lyk/twelve_anniversary_purchase_limit_activity/getPayInfo',
        method: 'get',
        response: () => {
            // return {
            //     "status":1,
            //     "msg":"请求成功",
            //     "data":{
            //         "package_id":1, //套包id
            //         "package_total_fee":140, //套包总价
            //         "package_rmb":9.9,
            //         "package_dollar":5, //套包美元价格
            //         "base_pay_info":{
            //             "order_type":46
            //         },
            //         "pay_type_list": [
            //             // {
            //             //     "pay_type": 100,
            //             //     "pay_name": "聚合支付",
            //             //     "cz_type": 0,
            //             //     "is_current": 0
            //             // },
            //             // 非聚合支付
            //             {
            //                 "pay_type": 1,
            //                 "pay_name": "微信支付",
            //                 "cz_type": 1,
            //                 "is_current": 1
            //             },
            //             {
            //                 "pay_type": 2,
            //                 "pay_name": "支付宝",
            //                 "cz_type": 2,
            //                 "is_current": 0
            //             },
            //             // 聚合支付
            //             {
            //                 "pay_type": 3,
            //                 "pay_name": "PayPal",
            //                 "cz_type": 3,
            //                 "is_current": 1
            //             }
            //         ]
            //     }
            // }
            return {
                "status":1,
                "msg":"请求成功",
                "data":{
                    "product_id":1,
                    "product_type":1, // 类型
                    "package_id":8121,
                    "package_total":100, // 总结
                    "package_rmb":10,
                    "package_dollar":5,
                    "base_pay_info":{
                        "order_type":1,
                        "cz_source":3, // 支付来源
                    },
                    "pay_type_list":[
                        {
                            "pay_type":1,
                            "pay_name":"微信支付",
                            "cz_type":0,
                            "is_current":1 // 默认
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
                        }

                        //             {
                        //                 "pay_type": 100,
                        //                 "pay_name": "支付宝",
                        //                 "cz_type": 2,
                        //                 "is_current": 1
                        //             },
                        //             // 聚合支付
                        //             {
                        //                 "pay_type": 3,
                        //                 "pay_name": "PayPal",
                        //                 "cz_type": 3,
                        //                 "is_current": 0
                        //             }
                    ]
                }
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
                "status": 202,
                "msg": "订单待支付！"
            }
        },
    },
    {
        url: '/api/v1/lyk/twelve_anniversary_cash_lb_exchange_activity/getExchangeList',
        method: 'post',
        response: () => {
            return {
                "status":1,
                "msg":"请求成功",
                "data":[{
                    "exchange_id":1,
                    "cash_lb_name":"1000提现币",
                    "exchange_name":"1100下载币",
                    "exchange_type":1, //兑换类型：1-下载币、2-全站VIP年卡、3-素材贵族年卡、4-渲染贵族年卡、5-币充值优惠券、6-会员贵族开通券
                    "exchage_desc":"",
                    "exchange_status":3 //按钮状态：1-兑换、2-当日已兑换、3-当日已兑完
                },{
                    "exchange_id":2,
                    "cash_lb_name":"5000提现币",
                    "exchange_name":"5600下载币",
                    "exchange_type":1,
                    "exchage_desc":"",
                    "exchange_status":1
                },{
                    "exchange_id":3,
                    "cash_lb_name":"10000提现币",
                    "exchange_name":"12000下载币",
                    "exchange_type":1,
                    "exchage_desc":"",
                    "exchange_status":1
                },{
                    "exchange_id":4,
                    "cash_lb_name":"60提现币",
                    "exchange_name":"充值无门槛10元券",
                    "exchange_type":5,
                    "exchage_desc":"",
                    "exchange_status":1
                },{
                    "exchange_id":5,
                    "cash_lb_name":"2300提现币",
                    "exchange_name":"全站VIP年卡",
                    "exchange_type":2,
                    "exchage_desc":"",
                    "exchange_status":1
                },{
                    "exchange_id":6,
                    "cash_lb_name":"900提现币",
                    "exchange_name":"素材贵族年卡",
                    "exchange_type":3,
                    "exchage_desc":"",
                    "exchange_status":1
                },{
                    "exchange_id":7,
                    "cash_lb_name":"900提现币",
                    "exchange_name":"渲染贵族年卡",
                    "exchange_type":4,
                    "exchage_desc":"",
                    "exchange_status":1
                },{
                    "exchange_id":8,
                    "cash_lb_name":"100提现币",
                    "exchange_name":"会员贵族开通15元券",
                    "exchange_type":6,
                    "exchage_desc":"",
                    "exchange_status":1
                }]
            }
        },
    },
    {
        url: '/api/v1/lyk/twelve_anniversary_cash_lb_exchange_activity/getExchangeInfo',
        method: 'post',
        response: () => {
            return {
                "status":1,
                "msg":"请求成功",
                "data":{
                    "exchange_name":"1000提现币兑换1100下载币",
                    "exchange_type":1,
                    "user_cash_lb":999999
                }
            }
        },
    },
    {
        url: '/api/v1/lyk/twelve_anniversary_cash_lb_exchange_activity/exchange',
        method: 'post',
        response: () => {
            return {
                "status":1,
                "msg":"兑换成功",
                "data":null
            }
        },
    },
];
