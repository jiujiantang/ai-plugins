export function useSc() {
    const isScEnabled = import.meta.env.VITE_USE_SC === "true";
    const devTips = () => {
        var _a;
        if (!((_a = window._lib_sc) === null || _a === void 0 ? void 0 : _a.trackEvent) && isScEnabled) {
            console.error('.env中未开启神策埋点功能');
            return false;
        }
        return true;
    };
    // trackEvent ("LykY24double11Click", {double11_24y_click: [9, 'number']})
    const scTrack = (eventName, params) => {
        var _a;
        if (!devTips())
            return false;
        (_a = window._lib_sc) === null || _a === void 0 ? void 0 : _a.trackEvent(eventName, params);
    };
    return { scTrack };
}
