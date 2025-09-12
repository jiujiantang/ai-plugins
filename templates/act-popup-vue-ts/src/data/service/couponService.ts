import { getCouponData } from '@/data/api/coupon';
import { adaptCoupon, Coupons, CouponApiData } from '@/data/adapter/couponData';

export async function getCoupon(price: number, package_id: number, cz_channel: number, vip_type:number): Promise<Coupons|null> {
    try {
        const response = await getCouponData({
            price,// 充值价格
            cz_channel, // 充值渠道
            client: 2, //2 - 溜云库
            vip_type, // 支付类型
            vip_package_id: package_id,
        });
        const {code, data, msg} = response.data;
        if(code === 1){
            return adaptCoupon(data as CouponApiData);
        }else if(code === 0){
            return null; // 无可用优惠券
        }else {
            window.easyPop.open({type: "toast", content: msg});
            return null;
        }
    } catch (error) {
        console.warn('接口异常');
        return null;
    }
}
