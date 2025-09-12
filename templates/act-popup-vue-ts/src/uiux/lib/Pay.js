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
    $('#_qrcode').html('')
    $('.pop_pay .ref .past').text('').addClass('loading').show()
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

          //检查支付
          checkPay(res.data.jkma,params.order_type, callback, parseInt(params.cz_type));

          $('.pop_pay .ref .past').removeClass("loading").hide()
        }else{
          window.easyPop.open({type: "toast", content: res.msg});

          // 手动刷新二维码
          $('.pop_pay .ref .past').removeClass("loading").html(`<p style="width: 100%;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);line-height: 20px; cursor: pointer" id="_userDefine_cover">二维码已失效<br>点击刷新</p>`).show()
          $('#_userDefine_cover').one("click", function () {
            $('#_payBtn li.active').trigger('click'); // 刷新二维码
          })
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
              width: 120,
              height: 120,
              text: url.qrcode
            });
          }, 100);
        }else{
          if (!document.getElementById("iframeid")) {
            $_qrcode.append(`<iframe id="iframeid" src="${url.payurl}" width="120" height="120" frameborder="0" scrolling="no"></iframe>`);
          }
        }
        break;
      case "wechat":
        $_qrcode.html('');
        $_qrcode.qrcode({
          width: 120,
          height: 120,
          text: url
        });
        break;
      default:
        break;
    }
  }
  var liuyunku = liuyunku || {};
  liuyunku.getVersionId = function() {
    var versionId = 0;
    try {
      versionId = window.external.LiuYunKuVersionId;
    } catch (err) {
      console.log('获取失败：' + err);
    }
    return Number(versionId);
  };
  liuyunku.paymentSuccessCallback = function(data) {
    var lykApi = {
      handler: typeof window.external == 'object' ? window.external : {},
      paymentSuccessCallback: function(data) {
        var hasErr = false, error;
        try {
          data = typeof data !== 'undefined' ? data : '';
          this.handler.paymentSuccessCallback(data);
        } catch (err) {
          hasErr = true;
          error = err;
        }

        return new Promise(function(resolve, reject) {
          hasErr ? reject(error) : resolve();
        });
      },
    };
    lykApi.paymentSuccessCallback(data).catch(function(err) {
      console.log('方法调用失败：' + err);
    });
  };
  liuyunku.refAccountCallback = function() {
    try {
      var lykApi = {
        handler: typeof window.external == 'object' ? window.external : {},
        refAccountCallback: function(data) {
          'refAccountCallback' in this.handler && this.handler.refAccountCallback(data);
        },
      };
      window.external.refAccountCallback();
    } catch (error) {
      console.log('方法调用失败');
    }
  };
//检查支付
  function checkPay(jkma, cz_channel, callback, cz_type){

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
            callback()
            clearInterval(loadPay);

            // 判断客户端版本，调用不同的方法
            var isTestEnv = window.location.origin.indexOf('test') > -1;
            var minVersionId = isTestEnv ? 660 : 1409;
            liuyunku.getVersionId() > minVersionId
              ? liuyunku.paymentSuccessCallback(res.data)
              : liuyunku.refAccountCallback();
          }else if(res.status === 401){
            if(cz_type !== 3){
              // 二维码过期
              $('.pop_pay .ref .past').html(`<p style="width: 100%;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);line-height: 20px; cursor: pointer" id="_userDefine_cover">二维码已失效<br>点击刷新</p>`).show()
              $('#_userDefine_cover').one("click", function () {
                $('#_payBtn li.active').trigger('click'); // 刷新二维码
              })
              clearInterval(loadPay);
            }
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
    $('.pop_pay .ref .past').hide()
    clearInterval(loadPay);
  }

  return {
    paymentFcun,
    clearTabCheckPay
  }
})()