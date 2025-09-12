import { defineStore } from "@/components/Plugins/PiniaPlugins";
import { ref } from "vue";

export const usePayInfoStore = defineStore("payInfo", () => {
    const packageId = ref(0);
    const couponId = ref(0);
    const payId = ref(0);
    const channelId = ref(0);
    const isShowCoupon = ref(false);

    return {
        // state
        packageId: packageId.value,
        couponId: couponId.value,
        payId: payId.value,
        channelId: channelId.value,
        isShowCoupon: isShowCoupon.value,
        // setter
        setPackageId: (id: number) => (packageId.value = id),
        setCouponId: (id: number) => (couponId.value = id),
        setPayId: (id: number) => (payId.value = id),
        setChannelId: (id: number) => (channelId.value = id),
        setIsShowCoupon: (isShow: boolean) => (isShowCoupon.value = isShow),
    };
});
