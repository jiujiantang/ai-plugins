window._lib_sc=(function() {
  // convertData 函数用于将输入数据根据指定类型进行转换，并在必要时提供默认值
  const convertData = (data, type, defaultValue) => {
    // 检查数据是否不是 undefined 和 null，使用严格比较
    if (data !== undefined && data !== null) {
      // 根据指定的类型对数据进行转换
      switch (type) {
        case 'string':
          return String(data); // 转换为字符串
        case 'number':
          return Number(data); // 转换为数字
        case 'bool':
          return Boolean(data === 1); // 检查数据是否为 1，并转换为布尔值
        case 'array':
          return Array.isArray(data) ? data : []; // 检查数据是否为数组，否则返回空数组
        default:
          return data; // 返回原始数据
      }
    } else {
      // 如果数据是 undefined 或 null，则返回默认值
      switch (type) {
        case 'string':
          return defaultValue !== undefined ? defaultValue : ''; // 如果提供了默认值则返回默认值，否则返回空字符串
        case 'number':
          return defaultValue !== undefined ? defaultValue : 0; // 如果提供了默认值则返回默认值，否则返回 0
        default:
          return defaultValue; // 返回提供的默认值
      }
    }
  };

  // reportTrackEvent 函数用于上报跟踪事件
  const trackEvent  = (eventName, params) => {
    // 检查 window 对象上是否有名为 TP3D66SENSORSTRACK 的函数
    if (typeof window.TP3D66SENSORSTRACK === 'function') {
      // 使用 Object.entries 将 params 内的每个键值对转成数组，并使用 reduce 方法进行迭代
      const formattedParams = Object.entries(params).reduce((acc, [key, value]) => {
        // 对每个键值对中的值进行检查，如果是数组则调用 convertData 进行处理
        acc[key] = Array.isArray(value)
          ? convertData(...value) // ...value 是扩展运算符，传递 value 数组作为参数
          : value; // 如果不是数组，直接赋值
        return acc; // 返回累积的对象
      }, {}); // 初始值是一个空对象 {}

      // 调用 TP3D66SENSORSTRACK 函数，传递事件名称和格式化参数
      window.TP3D66SENSORSTRACK(eventName, formattedParams);
    }
  };

  // 神策登录
  const registerEvent = () => {
    // if(typeof window.TP3D66SENSORSUSERLOGIN === 'function' && JSON.parse($.cookie('userCookieData')).user_id){
    //   window.TP3D66SENSORSUSERLOGIN(JSON.parse($.cookie('userCookieData')).user_id);
    // }
    if(typeof window.TP3D66SENSORSUSERLOGIN === 'function') {
      var userCookieData = $.cookie('userCookieData');
      if (userCookieData) {
        try {
          var userData = JSON.parse(userCookieData);
          if (userData.user_id) {
            window.TP3D66SENSORSUSERLOGIN(userData.user_id);
          }
        } catch (e) {
          console.warn('Failed to parse user cookie data:', e);
        }
      }
    }
  }

  registerEvent();

  /**
   * 页面曝光:
   * trackEvent ("LykY24double11Exposure", {})
   * 点击曝光：
   * trackEvent ("LykY24double11Click", {double11_24y_click: [9, 'number']})
   */
  return {
    trackEvent
  }
})()
