export function useLogin() {
    const isLoginEnabled = import.meta.env.VITE_USE_LOGIN === "true";
    const devTips = () => {
        var _a;
        if (!((_a = window._lib_login) === null || _a === void 0 ? void 0 : _a.login) && isLoginEnabled) {
            console.error('.env中未开启登录功能');
            return false;
        }
        return true;
    };
    const checkLogin = () => {
        var _a;
        if (!devTips())
            return false;
        return isLoginEnabled ? (_a = window._lib_login) === null || _a === void 0 ? void 0 : _a.login() : true;
    };
    return { checkLogin };
}
