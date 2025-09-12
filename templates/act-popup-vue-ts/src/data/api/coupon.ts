import axios from 'axios'
import Common from 'common'
const {useUrl} = Common
const {getServiceUrl} = useUrl()

export function getCouponData(params: { price: number, cz_channel: number, client: number, vip_type:number, vip_package_id:number }) {
    return axios.post(getServiceUrl(`/pay/common/getCouponInfo`), {
        price: params.price,
        cz_channel: params.cz_channel,
        client: params.client,
        vip_type: params.vip_type,
        vip_package_id: params.vip_package_id,
    },{
        withCredentials: true,
    });
}