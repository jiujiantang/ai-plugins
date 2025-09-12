import axios from 'axios'
import Common from 'common'
const {useUrl} = Common
const {getServiceUrl} = useUrl()

export const getPageData = ()=> {
    return  axios.get(getServiceUrl('/api/v1/lyk/user_new_vip_recharge/pageInfo'), {
        withCredentials: true, // 确保请求中携带 cookies
    });
}