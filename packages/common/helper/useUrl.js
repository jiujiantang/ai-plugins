const originUrl = window.location.origin;

// 过滤 URL 首字符
function urlFirstString(url) {
    if (url === '') {
        return '';
    }
    const outputString = url.slice(0, 1);
    if (outputString === '/') {
        return url;
    } else {
        return '/' + url;
    }
}

export function useUrl() {
    // 获取动态 URL 函数
    const getUrl = (type, url = '', specialId) => {
        const baseUrls = {
            software: 'software',
            static: 'static',
            user: 'user',
            service: 'service',
            api: 'api',
        };

        const baseUrl = baseUrls[type];

        // 连接符
        let connector = "test"
        if(specialId){
            if (specialId === 1){
                connector =  "_test"
            }
        }

        if (originUrl.indexOf('dev') !== -1) {
            return `http://${baseUrl}.dev.3d66.com${urlFirstString(url)}`;
        }
        // 测试环境
        if (originUrl.indexOf('test') !== -1 || originUrl.indexOf('dybzp') !== -1) {
            return `https://${baseUrl}${connector}.3d66.com${urlFirstString(url)}`;
        }
        // 本地调试
        if(originUrl.indexOf('localhost') !== -1){
            return "http://localhost.3d66.com:8888"+urlFirstString(url);
        }
        return `https://${baseUrl}.3d66.com${urlFirstString(url)}`;
    };

    // 计算各个域名的URL
    const getSoftwareUrl = (url = '') => getUrl('software', url);
    const getUserUrl = (url = '') => getUrl('user', url);
    const getServiceUrl = (url = '') => getUrl('service', url);
    const getApiUrl = (url = '') => getUrl('api', url);

    // 获取 URL 参数
    const getQueryVariable = (variable) => {
        const query = window.location.search.substring(1);
        const vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split("=");
            if (pair[0] === variable) {
                return pair[1];
            }
        }
        return false;
    };

    // 静态资源
    const getLykstaticUrl = (url = '') => {
        if (originUrl.indexOf('dev') !== -1) {
            return `http://lykstatic.dev.3d66.com${urlFirstString(url)}`;
        }
        // 测试环境 & 本地调试
        if (originUrl.indexOf('test') !== -1 || originUrl.indexOf('dybzp') !== -1 || originUrl.indexOf('localhost.3d66.com') !== -1) {
            return `https://lykstatictest.3d66.com${urlFirstString(url)}`;
        }
        return `https://lykstatic.3d66.com${urlFirstString(url)}`;
    };
    const getStaticUrl = (url = '') => {
        if (originUrl.indexOf('dev') !== -1) {
            return `http://static.dev.3d66.com${urlFirstString(url)}`;
        }
        // 测试环境 & 本地调试
        if (originUrl.indexOf('test') !== -1 || originUrl.indexOf('dybzp') !== -1 || originUrl.indexOf('localhost.3d66.com') !== -1) {
            return `https://static_test.3d66.com${urlFirstString(url)}`;
        }
        return `https://static.3d66.com${urlFirstString(url)}`;
    };

    return {
        getSoftwareUrl,
        getStaticUrl,
        getUserUrl,
        getServiceUrl,
        getApiUrl,
        getLykstaticUrl,
        getQueryVariable,
    };
}
