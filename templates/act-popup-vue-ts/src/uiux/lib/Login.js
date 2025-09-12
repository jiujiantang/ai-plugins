window._lib_login = (function() {
  // 过滤 URL 的首字符，确保以 / 开头
  function urlFirstString(url = '') {
    return url.startsWith('/') ? url : `/${url}`;
  }

  // 根据当前环境获取用户域名
  function getUserUrl(url = '') {
    const origin = window.location.origin;
    let domain = 'https://user.3d66.com';

    if (origin.includes('dev')) {
      domain = "http://user.dev.3d66.com";
    } else if (origin.includes('test') || origin.includes('dybzp')) {
      domain = "https://usertest.3d66.com";
    }

    return domain + urlFirstString(url);
  }

  function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  // 判断用户是否已登录
  function isLogin() {
    try {
      const userInfo = getCookie('userCookieData');
      return !!userInfo && userInfo !== 'null';
    } catch (error) {
      console.log("Error checking login status:", error);
      return false;
    }
  }

  // 打开登录弹窗
  function openLogin() {
    const ref = getUserUrl('/login/popover/welcome');
    layer.open({
      type: 2,
      title: false,
      resize: false,
      area: ['750px', '498px'],
      content: [ref],
      anim: 5,
      end: () => {
        clearInterval(timer);
      }
    });
    const timer = setInterval(() => {
      if (isLogin()) {
        clearInterval(timer);
        window.location.reload();
      }
    }, 1000); // Ensures a time interval is supplied
  }

  // 对外暴露的login方法
  function login() {
    try {
      if (!isLogin()) {
        openLogin();
        return false;
      }else {
        return true;
      }
    } catch (e) {
      console.log("Login error:", e);
    }
  }

  // 只暴露 login 方法
  return {
    login
  };
})();
