import NineSquareLottery from './model/nineSquareLottery/index.vue';
import {usePreloadImg} from "./helper/usePreload";
import {useCopy} from "./helper/useCopy";
import {useExternalMethod} from "./helper/useExternalMethod";
import {useUrl} from "./helper/useUrl";
import {useVersionUpdater} from "./helper/useVersionUpdater";
import {useVersionUpdaterV2} from "./helper/useVersionUpdaterV2";
import Toast from "./kuUi/Toast/index.vue";
import Bubble from "./kuUi/Bubble/index.vue";
import MessageCarousel from "./kuUi/MessageCarousel/index.vue";
import Modal from "./kuUi/BaseModal.vue";

export default {
    usePreloadImg,
    useCopy,
    useExternalMethod,
    useUrl,
    useVersionUpdater,
    useVersionUpdaterV2,
    Toast,
    Bubble,
    MessageCarousel,
    Modal,
};

// 九宫格抽奖
export const registerNineSquareLottery = (app) => {
    app.component('NineSquareLottery', NineSquareLottery);
};
