export function useSc() {
    const isScEnabled = import.meta.env.VITE_USE_SC === "true";

    const devTips = (): boolean => {
        if (!window._lib_sc?.trackEvent && isScEnabled) {
            console.error('.env中未开启神策埋点功能');
            return false;
        }
        return true;
    };

    // trackEvent ("LykY24double11Click", {double11_24y_click: [9, 'number']})
    const scTrack = (eventName: string, params: Record<string, any[]>|{}) => {
        if (!devTips()) return false;
        window._lib_sc?.trackEvent(eventName, params);
    };

    return { scTrack };
}
