import axios from 'axios'
import Common from 'common'
const {useUrl} = Common
const {getServiceUrl} = useUrl()

export function getPackageData(params: { product_id: number }) {
    return axios.get(getServiceUrl(`/api/v1/lyk/user_new_vip_recharge/getPackageData?product_id=${params.product_id}`), {
        withCredentials: true,
    });
}