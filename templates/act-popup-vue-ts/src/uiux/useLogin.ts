export function useLogin() {
    const isLoginEnabled = import.meta.env.VITE_USE_LOGIN === "true";

    const devTips = (): boolean => {
        if (!window._lib_login?.login && isLoginEnabled) {
            console.error('.env中未开启登录功能');
            return false;
        }
        return true;
    };

    const checkLogin = () => {
        if (!devTips()) return false;
        return isLoginEnabled ? window._lib_login?.login() : true;
    };

    return { checkLogin };
}
