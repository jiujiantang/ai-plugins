window._lib_pay=(function (){
  // 过滤Url首字符
  function urlFirstString(url){
    if(url===''){
      return ''
    }
    const outputString = url.slice(0, 1);
    if(outputString==='/'){
      return url;
    }else {
      return '/'+url;
    }
  }
// Service域名
  function getServiceUrl(url='') {
    if(window.location.origin.indexOf('localhost')!==-1||window.location.origin.indexOf('dybzp')!==-1){
      return "http://localhost.3d66.com:8888"+urlFirstString(url);
    }
    if(window.location.origin.indexOf('dev')!==-1){
      return "http://service.dev.3d66.com"+urlFirstString(url);
    }
    if(window.location.origin.indexOf('test')!==-1||window.location.origin.indexOf('dybzp')!==-1){
      return "https://service_test.3d66.com"+urlFirstString(url);
    }
    return "https://service.3d66.com"+urlFirstString(url);
  }

  let loadPay = null

// 支付接口
  function paymentFcun(params, callback ) {
    $('.pop_pay .ref .past').text("loading...").show()
    let data = JSON.stringify(params);
    $.ajax({
      url: getServiceUrl('/payment/do_payment'),
      type: 'post',
      data: {data},
      xhrFields: {
        withCredentials: true
      },
      success: function(res) {
        // debugger
        if(res.status === 1){
          switch(parseInt(params.cz_type)){
            case 0:
              createQrCodes(res.data.qrcode, "wechat");
              break;
            case 1:
              createQrCodes(res.data, "ali");
              break;
            case 3://paypal
              $('#_paypalSubmit').html(res.data.payurl);
              break;
            default:
              //清除二维码
              $('#_qrcode').empty();
              //微信扫码支付二维码
              createQrCodes(res.data.qrcode, "wechat");
              break;
          }

          $('.pop_pay .ref .past').hide()

          //检查支付
          checkPay(res.data.jkma,params.order_type, callback);
        }else{
          layer.msg(res.msg);
        }
      }
    });
  }
//二维码
  function createQrCodes(url, type) {
    let DEFAULT_VERSION = "8.0";
    let ua = navigator.userAgent.toLowerCase();
    let isIE = ua.indexOf("msie") > -1;
    let safariVersion;
    if (isIE) {
      safariVersion = ua.match(/msie ([\d.]+)/)[1];
    }
    //判断IE8浏览器，qrcode使用table,其他版本使用canves
    //生成二维码
    const $_qrcode = $('#_qrcode')
    switch (type) {
      case "ali":
        $_qrcode.html('');
        if(url.unionPay){ // 是否聚合支付
          setTimeout(function () {
            $_qrcode.qrcode({
              width: 152,
              height: 152,
              text: url.qrcode
            });
          }, 100);
        }else{
          if (!document.getElementById("iframeid")) {
            $_qrcode.append(`<iframe id="iframeid" src="${url.payurl}" width="152" height="152" frameborder="0" scrolling="no"></iframe>`);
          }
        }
        break;
      case "wechat":
        $_qrcode.html('');
        $_qrcode.qrcode({
          width: 152,
          height: 152,
          text: url
        });
        break;
      default:
        break;
    }
  }
//检查支付
  function checkPay(jkma, cz_channel, callback){

    clearInterval(loadPay);
    // 轮询
    loadPay = setInterval(function(){

      // 如果关闭弹窗，结束轮巡
      if(!$(".pop_pay").is(':visible')){
        clearInterval(loadPay);
      }

      $.ajax({
        url: getServiceUrl('/pay/check_pay'),
        type: 'post',
        data:{service: "ll.order.check", jkma: jkma, cz_channel: cz_channel},
        xhrFields: {
          withCredentials: true
        },
        success: function(res) {
          // 判断订单支付情况
          if(res.status === 200){

            // layer.msg('支付成功');
            // 关闭弹窗，重新渲染页面
            // $("#_pop, #_pop>div").hide()
            callback()

            clearInterval(loadPay);

            // 判断客户端版本，调用不同的方法
            var isTestEnv = window.location.origin.indexOf('test') > -1;
            var minVersionId = isTestEnv ? 660 : 1409;

            try {
              liuyunku.getVersionId() > minVersionId
                ? liuyunku.paymentSuccessCallback(res.data)
                : liuyunku.refAccountCallback();
            }catch(e){
              console.log(e.toString());
            }

          }else if(res.status === 401){

            // 二维码过期
            $('.pop_pay .ref .past').html(`<p class="userDefine_cover">已失效<br>请重新秒杀</p>`).show()
            clearInterval(loadPay);
          }
        },
        error: function(err){
          console.log('err:',err)
        }
      })
    },2000)
  }

// 切换套包的时候清除轮训
  function clearTabCheckPay(){
    clearInterval(loadPay);
  }

  return {
    paymentFcun,
    clearTabCheckPay
  }
})()