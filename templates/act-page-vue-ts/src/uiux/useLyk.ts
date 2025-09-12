export function useLyk() {
    const isLykEnabled = import.meta.env.VITE_USE_LYK === "true";

    const devTips = (): boolean => {
        if (!window.external && isLykEnabled) {
            console.error('.env中未开启溜云库方法');
            return false;
        }
        return true;
    };

    const isLyk = (): boolean => {
        const userAgent = navigator.userAgent;
        return userAgent.indexOf('Lyk4') > -1;
    }

    const withLyk = (type: LykFnTypes, ...args: any[]) => {
        if (!devTips()) return false;

        if(!isLyk()){
            alert("请在溜云库内打开")
        }

        if (typeof window !== "undefined") {
            const callMethod = window.external?.[type];
            if (callMethod) {
                try {
                    console.log('客户端方法调用，方法名：', type,'===','参数：', ...args);
                    // @ts-ignore
                    return callMethod(...args);
                } catch (error) {
                    console.error("此方法异常：", type, "错误：", error);
                }
            } else {
                console.error('方法未注入，方法名：', type, '===', '参数：', ...args);
            }
        } else {
            console.error("没有windows对象！");
        }
        return undefined;
    };

    return { withLyk };
}
