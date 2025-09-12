// 全埋点
/**
 * 弹窗埋点
 * 1: 关闭弹窗
 */
export const POP_BUTTON: Record<any, any> = {
    1: 'F7382B1A3754417CBFF73C493F6E51B7',
};
/**
 *  切换会员类型 埋点对象
 *  1: "66大会员",
 *  2: "素材会员",
 *  3: "渲染贵族",
 *  4: "全景VIP",
 *  5: "AI大会员",
 *  6: "自学贵族",
 */
export const NAV_CATEGORY: Record<any, any> = {
    1: '988AB2CD3850435A96C3789B2C410B11',
    2: '590D04F58C2A4551A45C946475D97405',
    3: '94A422FFC7E44F72A2C96218FE6B0553',
    4: '03B568511F2A4108B5C9ACCD6ECBECBF',
    5: '7B36F2980847438C8BED1E512A07821D',
    6: 'F6AB2AF8048F44DCA0F39E8DDBDAC7C5',
};
/**
 *  类目导航子类 埋点对象
 *  8: "基础素材会员标签",
 *  9: "超级素材会员标签",
 *  5: "全景VIP标签",
 *  6: "大容量VIP标签",
 */
export const NAV_CATEGORY_CHILD: Record<any, any> = {
    8: '6CFB4A5E88004C219A3F85F8C03FB350',
    9: '947079E514C443BB970399DF97EF880B',
    5: '1A3F829E456E46038F8232A1B3663F87',
    6: 'C0F33729C4B741DB80B4FB11A028BD2F',
};
/**
 * 各类目操作 埋点对象
 * 套包切换：change_pkg
 * 更多权益：more_benefit
 * 选择优惠券：change_coupon
 */
export const CATEGORY_OPERATE_ATTR: Record<number, any> = {
    1: {
        change_pkg: 'A80FF96A14ED476489985E25C2957C95',
        more_benefit: '44AAC094FF21476FA758BAF71F922EBA',
        change_coupon: 'EA4AEFBF6FCD4C8D9DF76AE01A27D594',
    },
    2: {
        change_pkg: '0D5A6017FFEA40F49C3CDFF818055D7D',
        more_benefit: 'EA5457B2336B42C1967271ED30BF308B',
        change_coupon: 'F299B62381D346FD9AE31BFF07280E5D',
    },
    3: {
        change_pkg: '36E1EAB11F4F47AD97E09B5D0CF7A5EC',
        change_coupon: '00590A4F0A9847EBAE1986AFFABE0A36',
    },
    4: {
        change_pkg: 'BD16F51B911B4FAAB6F18CFD400DEDB0',
        more_benefit: '108FEB1E7683481A8EF34B6F18A1E476',
        change_coupon: '9196817BD00A4F659D1512B95BA82476',
    },
    5: {
        change_pkg: '1099D1C1F1CB4895BED742E0E9BC97A9',
        change_coupon: 'C1B221C3972E4907B78F578B4AC1B4A7',
    },
    6: {
        change_pkg: '4A09AEDDCF9B439091A7522432BD02E5',
        change_coupon: '50A253100ABF4187BE8F2D7C47D61265',
    },
};



