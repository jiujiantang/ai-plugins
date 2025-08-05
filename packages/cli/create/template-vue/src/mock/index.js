export default [
    {
        url: '/api/v1/lyk/spring_promotion_lottery_activity_by_2025/getPageInfo',
        method: 'get',
        response: () => {
            return {
                "status":1,
                "msg":"请求成功",
                "data":{
                    "prize_list":[
                        {"prize_id":120,"prize_name":"2次返还","prize_value":900},
                        {"prize_id":121,"prize_name":"3次返还","prize_value":300},
                        {"prize_id":122,"prize_name":"2次返还","prize_value":200},
                        {"prize_id":123,"prize_name":"2次返还","prize_value":200},
                        {"prize_id":124,"prize_name":"2次返还","prize_value":200},
                        {"prize_id":125,"prize_name":"2次返还","prize_value":200},
                        {"prize_id":126,"prize_name":"2次返还","prize_value":200},
                        {"prize_id":127,"prize_name":"2次返还","prize_value":200},
                        {"prize_id":128,"prize_name":"2次返还","prize_value":200},
                        {"prize_id":129,"prize_name":"2次返还","prize_value":200},
                    ],
                    "winning_carousel_list":[
                        {"user_name":"溜粉_64504079","user_img":"https://lykstatictest.3d66.com/liuyunku/application/packages/spring_sale/public/vue.svg","prize_value":1500},
                        {"user_name":"溜粉_64504079","user_img":"https://lykstatictest.3d66.com/liuyunku/application/packages/spring_sale/public/vue.svg","prize_value":1500}
                    ]
                }
            };
        },
    },
    {
        url: '/api/v1/lyk/spring_promotion_lottery_activity_by_2025/draw',
        method: 'post',
        response: ({ body }) => {
            console.log(body);
            return {
                "status":1,
                "msg":"请求成功",
                "data":{
                    "prize_id":122,
                    "prize_type":1,
                    "prize_value":200,
                    "prize_describe":"分2个月发放至账户，抽中后获得第1笔返还，剩余每月1号返还",
                    "invite_link":"http://static.dev.3d66.com/liuyunku/dist/html/distribution/Inviter-index.html?code=666666"
                }
            };
        },
    },
];
