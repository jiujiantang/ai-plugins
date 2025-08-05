import { onMounted } from 'vue';

export function useVersionUpdater(name, jsonUrl) {
    onMounted(() => {
        function setCookie(name, value, days) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }

        function getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        const url = jsonUrl + '?v=' + new Date().getTime();

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    console.error('Network response was not ok');
                }
                // 将响应的数据解析为 JSON
                return response.json();
            })
            .then(data => {

                // 处理版本逻辑
                const version = getCookie(name);
                if (version) {
                    if (version !== data.version) {
                        const baseUrl = window.location.href;
                        const queryParameters = `v=${data.version}`;
                        if (baseUrl.indexOf("?") !== -1) {
                            window.location.href = `${baseUrl}&${queryParameters}`;
                        } else {
                            window.location.href = `${baseUrl}?${queryParameters}`;
                        }
                    }
                }
                setCookie(name, data.version, 7);
            })
            .catch(error => {
                console.error('Failed to fetch the json:', error);
            });
    });
}
