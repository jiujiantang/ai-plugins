import {ref, watch} from 'vue';

export function useExternalMethod(type, ...args) {
    const isError = ref(false); // 用来记录是否发生错误
    const errorMessage = ref(""); // 错误信息

    watch(isError, ()=>{
        isError.value && console.error(errorMessage.value);
    })

    if (typeof window !== "undefined") {
        // 判断是否有 window 对象
        try {
            const callMethod = window.external[type]; // 获取指定的方法
            if (callMethod) {
                try {
                    console.log('客户单方法调用，方法名：', type, '===', '参数：', ...args);
                    return callMethod(...args); // 调用方法，并传递参数
                } catch (error) {
                    errorMessage.value = `此方法异常：${type}`;
                    isError.value = true;
                }
            } else {
                errorMessage.value = `方法未注入，方法名：${type}, 参数：${args}`;
                isError.value = true;
            }
        } catch (e) {
            errorMessage.value = `方法未注入，方法名：${type}, 参数：${args}`;
            isError.value = true;
        }
    } else {
        errorMessage.value = "没有 windows 对象！";
        isError.value = true;
    }

}
