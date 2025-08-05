// 跨域方案 解决 登录窗口操作父页面cookie的问题
window.addEventListener('message', (event) => {

    function GetQueryValue1(queryName) {
        var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        } else {
            return null;
        }
    }

    // 极跨处理：登录回调
    if (event.data == 'login_callback') {
        var ref = $('#httpReferer').val();
        if (ref) {
            ref = ref.replace('type', "urlType");
            try{
                parent.window.location.href = decodeURIComponent(ref);
            } catch (error) {
                parent.window.location.href = ref;
            }
        } else {
            // 登录成功后跳转到灵感图首页 //登录成功后如果是灵感图-sem落地页，跳转到灵感图首页
            if( parent.window.location.href.indexOf('sem_lgt1.html') != -1 ||  parent.window.location.href.indexOf('sem_lgt2.html') != -1){
                parent.window.location.href = objSite.linggantu_domain;
                return;
            }
            parent.window.location.reload();
        }
        parent.layer.closeAll();
    }

    // 极跨处理：关闭弹窗
    if (event.data == 'closelayer') {
        parent.layer.closeAll();
    }

    // 极跨处理：关闭弹窗
    if (event.data == 'openUserWin_poplogin') {
        parent.objSite.openUserWin('/login/popover/welcome?poplogin=login', ['750px', '498px']);
    }

    // 极跨处理：父级页面重载
    if (event.data == 'cross_domain_4') {
        // 登录成功后跳转到灵感图首页 //登录成功后如果是灵感图-sem落地页，跳转到灵感图首页
        if( parent.window.location.href.indexOf('sem_lgt1.html') != -1 ||  parent.window.location.href.indexOf('sem_lgt2.html') != -1){
            parent.window.location.href = objSite.linggantu_domain;
            return;
        }
        parent.location.reload();
    }

    // 极跨处理：父级的父级页面重载
    if (event.data == 'cross_domain_4_1') {
        parent.parent.location.reload();
    }

    // 极跨处理：父级页面重载关闭
    if (event.data == 'cross_domain_5') {
        parent.layer.closeAll();
    }

    // 极跨处理：父级页面重载关闭
    if (event.data == 'qqlogin_wx_login_6') {
        // 关闭所有弹窗层
        parent.layer.open({
            type: 2,
            area: ['400px', '520px'],
            content: [objSite.getUserUrl('/account/security/unsealing?m=1&t=' + (new Date()).valueOf()), 'no'],
            title: false,
            closeBtn: 0
        });
        window.top.close();
    }

    if (event.data == 'closeall_reload_7') {
        parent.layer.closeAll();
        parent.location.reload();
    }

    if (event.data.name == 'cross_domain_8' || event.data == 'cross_domain_8') {
        var sc_parameter=event.data.sc_parameter || '';
        parent.layer.closeAll();
        parent.objSite.openUserWin('/login/popover/login'+sc_parameter, ['460px', '498px']);
    }

    // 登录冻结用户
    if (event.data == 'logonFrozenUser_9') {
        parent.layer.open({
            type: 2,
            area: ['400px', '520px'],
            content: [objSite.getUserUrl('/account/security/unsealing?m=1&t=' + (new Date()).valueOf()), 'no'],
            title: false,
            closeBtn: 0
        });

        window.top.close();
    }

    // 登录冻结用户
    if (event.data == 'logonFrozenUser_10') {
        parent.layer.open({
            type: 2,
            area: ['400px', '520px'],
            content: [objSite.getUserUrl('/account/security/unsealing?m=1&l=1&t=' + (new Date()).valueOf()), 'no'],
            title: false,
            closeBtn: 0
        });

        window.top.close();
    }


    // 手机邮箱登录 : 手机、用户名
    if (event.data.name == 'mobileEmailLogin_11' || event.data == 'mobileEmailLogin_11') {

        var new_data_id = parent.$(".switch-item-active").attr("data-id") || "1";
        var new_keyword = parent.$("#wwwKeyword").val();
        var bew_trigger = parent.$(".js_upload_btn_cc>a.nav-link").attr("data-trigger-click");
        var bew_trigger2 = parent.$(".js_upload_btn_cc2").attr("data-trigger-click2");
        var bew_trigger3 = parent.$(".js_upload_btn_cc3").attr("data-trigger-click3");
        var bew_trigger4 = parent.$(".js_upload_btn_cc4").attr("data-trigger-click4");
        parent.layer.closeAll();
        var sc_parameter=event.data.sc_parameter || '';
        if (new_keyword) {
            var new_url_page = objSite.getSoUrl("/res/opt/" + new_keyword + "_" + new_data_id + "_1.html");
            parent.objSite.openUserWin('/login/popover/login?url=' + new_url_page+sc_parameter, ['460px', '498px']);
        } else if (bew_trigger == "1" || bew_trigger3 == "1" || bew_trigger4 == "1") {
            var new_url_page2 = objSite.getUploadUrl('/upload/index/index');
            parent.objSite.openUserWin('/login/popover/login?url=' + new_url_page2+sc_parameter, ['460px', '498px']);
        } else if (bew_trigger2 == "1") {
            var new_url_page3 = objSite.getUserUrl('/');
            parent.objSite.openUserWin('/login/popover/login?url=' + new_url_page3+sc_parameter, ['460px', '498px']);
        } if ($('#httpReferer').val() != "") {
            var new_url_page4 = encodeURIComponent(parent.window.location.href);
            parent.objSite.openUserWin('/login/popover/login?url=' + $('#httpReferer').val()+sc_parameter, ['460px', '498px']);
        } else {

            /**
             * 登录转化
             * 备注：所有涉及的转化都需要去 loginConversionFunc 处理。
             * login_type  1:微信登录   2：账号登录   3、QQ登录   4：手机号登录
             * login_source：登录来源
             */
            var loginConversion = '';

            parent.objSite.openUserWin('/login/popover/login?poplogin=login' + loginConversion+sc_parameter, ['460px', '498px']);
        }
    }

    // 微信登录
    if (event.data == 'mobileEmailLogin_12') {

        function wechatUrl() {
            var callBackUrl = window.parent.document.URL;
            return objSite.getUserUrl('/login/wx_login?llurl=' + encodeURIComponent(callBackUrl) + '&is_ground=1');

        }
        // 使用微信网页授权
        var wxurl = wechatUrl();
        parent.layer.closeAll();
        parent.window.location.href = objSite.getUserUrl(wxurl);
    }

    // 跳转到快速注册
    if (event.data.name == 'mobileEmailLogin_13' || event.data == 'mobileEmailLogin_13') {
        parent.layer.closeAll();
        var sc_parameter=event.data.sc_parameter || '';
        parent.objSite.openUserWin('/login/popover/register'+sc_parameter, ['460px', '498px']);
    }

    // 切换账号登录 
    if (event.data.name == 'cross_domain_14' || event.data == 'cross_domain_14') {
        var new_data_id = parent.$(".switch-item-active").attr("data-id") || "1";
        var new_keyword = parent.$("#wwwKeyword").val();
        // 2022开年邀请
        var inviteRegCode = parent.$("#inviteRegCode").val();

        parent.layer.closeAll();
        var sc_parameter=event.data.sc_parameter ||'';
        if (new_keyword) {
            new_ref = objSite.getSoUrl("/res/opt/" + new_keyword + "_" + new_data_id + "_1.html");
            parent.objSite.openUserWin('/login/popover/accountlogin?source=user&url=' + new_ref+sc_parameter, ['460px', '498px']);
        } else if (inviteRegCode) {
            new_ref = encodeURIComponent(parent.window.location.href);
            parent.objSite.openUserWin('/login/popover/accountlogin?source=user&url=' + new_ref+sc_parameter, ['460px', '498px']);
        } else if (GetQueryValue1('url')) {
            parent.objSite.openUserWin('/login/popover/accountlogin?source=user&url=' + GetQueryValue1('url')+sc_parameter, ['460px', '498px']);
        } else {

            /**
             * 登录转化
             * 备注：所有涉及的转化都需要去 loginConversionFunc 处理。
             * login_type  1:微信登录   2：账号登录   3、QQ登录   4：手机号登录
             * login_source：登录来源
             */
            var loginConversion = '';

            parent.objSite.openUserWin('/login/popover/accountlogin?source=user' + loginConversion+sc_parameter, ['460px', '498px']);
        }

    }

    // 切换手机号登录
    if (event.data.name == 'cross_domain_15' || event.data == 'cross_domain_15'){
        var new_data_id = parent.$(".switch-item-active").attr("data-id") || "1";
        var new_keyword = parent.$("#wwwKeyword").val();
        parent.layer.closeAll();
        var sc_parameter=event.data.sc_parameter || '';
        if(new_keyword){
            new_ref = objSite.getSoUrl("/res/opt/"+ new_keyword +"_"+ new_data_id +"_1.html");
            parent.objSite.openUserWin('/login/popover/login?source=user&url=' + new_ref+sc_parameter, ['460px', '498px']);
        }else if(GetQueryValue1('url')){
            parent.objSite.openUserWin('/login/popover/login?source=user&url=' + GetQueryValue1('url')+sc_parameter, ['460px', '498px']);
        }else{

            /**
             * 登录转化
             * 备注：所有涉及的转化都需要去 loginConversionFunc 处理。
             * login_type  1:微信登录   2：账号登录   3、QQ登录   4：手机号登录
             * login_source：登录来源
             */
            var loginConversion = '';

            parent.objSite.openUserWin('/login/popover/login?source=user' + loginConversion+sc_parameter, ['460px', '498px']);
        }
    }

    // 忘记密码
    if (event.data.name == 'cross_domain_16' || event.data == 'cross_domain_16'){
        parent.layer.closeAll();
        var sc_parameter=event.data.sc_parameter || '';
        parent.objSite.openUserWin('/account/security/findPwd?source=user'+sc_parameter, ['460px', '498px']);
    }

    // 切换账号登录
    if (event.data.name == 'cross_domain_17' || event.data == 'cross_domain_17'){
        var new_data_id = parent.$(".switch-item-active").attr("data-id") || "1";
        var new_keyword = parent.$("#wwwKeyword").val();
        parent.layer.closeAll();
        var sc_parameter=event.data.sc_parameter || '';
        if(new_keyword){
            new_ref = objSite.getSoUrl("/res/opt/"+ new_keyword +"_"+ new_data_id +"_1.html");
            parent.objSite.openUserWin('/login/popover/accountlogin?source=user&url=' + new_ref+sc_parameter, ['460px', '498px']);
        }else{
            parent.objSite.openUserWin('/login/popover/accountlogin?source=user'+sc_parameter, ['460px', '498px']);
        } 
    }

    // 跳转到返回第三方登录页面
    if (event.data.name == 'cross_domain_18' || event.data == 'cross_domain_18'){
        var queryName=GetQueryValue1('url');//跳转参数
        var link=queryName?'?url='+queryName:'';//带着跳转参数回到注册
        var relation=parent.$(".seo-new-people").length?'?reg_refer=relation':'';//标签页SEO注册
        parent.layer.closeAll();
        var sc_parameter = '';
        if(event.data.sc_parameter){
            sc_parameter = link!=''||relation!=''?'&'+event.data.sc_parameter:'?'+event.data.sc_parameter;
        }
        parent.objSite.openUserWin('/login/popover/login'+link+relation+sc_parameter, ['460px', '498px']);
    }

    // 跳转到返回第三方登录页面 - 新版
    if (event.data.name == 'cross_domain_18_1'){
        var queryName=GetQueryValue1('url');//跳转参数
        var link=queryName?'?url='+queryName:'';//带着跳转参数回到注册
        var relation=parent.$(".seo-new-people").length?'?reg_refer=relation':'';//标签页SEO注册
        parent.layer.closeAll();
        var sc_parameter= ''
        if(event.data.sc_parameter){
            sc_parameter=link!=''||relation!=''?'&'+event.data.sc_parameter:'?'+event.data.sc_parameter;
        }
        // parent.objSite.openUserWin('/login/popover/login'+link+relation+sc_parameter, ['998px', '498px']);
        parent.objSite.openUserWin('/login/popover/welcome?iphoneCode=1&poplogin=login&sc_parameter=' + sc_parameter, ['792px', '564px']);
    }

    // 跳转到返回第三方登录页面：微信图标
    if (event.data.name == 'cross_domain_19' || event.data == 'cross_domain_19'){
        var link = GetQueryValue1('url') ? '&url=' + GetQueryValue1('url') : '';  //跳转参数
        var relation = parent.$(".seo-new-people").length ? '&reg_refer=relation' : ''; //标签页SEO注册
        parent.layer.closeAll();
        /**
         * 登录转化
         * 备注：所有涉及的转化都需要去 loginConversionFunc 处理。
         * login_type  1:微信登录   2：账号登录   3、QQ登录   4：手机号登录
         * login_source：登录来源
         */
        var loginConversion = event.data.sc_parameter || '';
        parent.objSite.openUserWin('/login/popover/welcome?poplogin=login' + link + relation + loginConversion, ['750px', '498px']);
    }

    // 获取url指定参数值
    if (event.data == 'cross_domain_20'){
        
    }

    // 
    if (event.data.name == 'cross_domain_21'){

        var grouping = event.data.data;
        parent.layer.open({
            type: 2, // 1（页面层）2（iframe层）
            title: false,
            skin: 'layer-nobg layer-pay-pop', //自定义皮肤类
            area: ['660px', '640px'], //宽高
            // content: objSite.getServiceUrl('/lb-pay-new-layout.html?newthat=' + newthat),
            content:event.data.url || objSite.getServiceUrl('/lb-pay-new-layout.html?newthat=187&ll_id='+$('#ll_id').val()+grouping),
            cancel: function cancel(index, layero) {
                // addCoupon(3, 15);
                // open_limit = false;
            }
        }); 
    }

    if (event.data.name == 'cross_domain_22'){

        var grouping = event.data.grouping;
        var currency_location = event.data.currency_location || 0;
        var data_first = event.data.data_first || $("#first").val();
        var areaArr = event.data.areaArr || ['900px', '693px'];
        var resType = event.data.resType || $('#res_type').val() || ''
        var _url = event.data.url || objSite.getServiceUrl('/lb-pay-layout.html?entrance=187&ll_id='+$('#ll_id').val()+'&first=' + data_first+grouping+"&currency_location="+currency_location)+'&payBuried=1&restype='+resType;
        var retain_activity = event.data.retain_activity;
        var wfw = parent.layer.open({
            type: 2, // 1（页面层）2（iframe层）
            title: false,
            id: '', // 弹窗唯一id
            skin: 'layer-nobg', //自定义皮肤类
            closeBtn: '1', //配置1和2来展示，如果不显示，则closeBtn: 0
            area: areaArr, //宽高
            // content: objSite.getServiceUrl('/lb-pay-layout.html?entrance=' + newthat + '&first=' + data_first),
            content: _url,
            cancel: function (index, layero) {
                // open_limit = false;
                // addCoupon(3, 15);
                // 这里先要知道，这个用户是不是新用户
                var isNewUser = $("#is_recharge_user").val();
                var first = $("#first").val();
                var modelId = $("#ll_id").val();

                if (isNewUser === "1" && first === "1") {
                    parent.layer.closeAll();
                    parent.layer.open({
                        type: 2, // 1（页面层）2（iframe层）
                        title: false,
                        id: '', // 弹窗唯一id
                        skin: 'layer-nobg', //自定义皮肤类
                        closeBtn: 0, //配置1和2来展示，如果不显示，则closeBtn: 0
                        area: ['408px', '680px'], //宽高
                        content: objSite.getUserUrl('/download/www_form/webSys?ll_id=' + modelId)
                    });
                } else { }

                // 优惠券弹窗模板和分发
                try {
                    var grid = $(layero).find("iframe").contents().find("#info_coupon").val();
                    var iframeWin = parent.window[layero.find('iframe')[0]['name']];
                    if (grid != "[]" && $.cookie('payCoupon') != '1') {
                        $.cookie('payCoupon', '1', { expires: 1, path: '/' });
                        iframeWin.notUsedCoupon();
                        // iframeWin.iterationDistribute();
                        return false;
                    } 
                } catch (error) {
                    
                }
                if(retain_activity){//是否有挽留弹窗活动
                    // 1详情页 1活动页
                    let position = 1;
                    if(retain_activity == 2){
                        position = 2;
                    }
                    //嘉伟挽留弹窗配置
                    var content ={
                        name:'cross_domain_111',
                        package_id:$.cookie("retain_package_id"),
                        position:position,
                    };
                    parent.window.postMessage(content, '*');
                }
               


            },
            end: function (index, layero) {
                // open_limit = false;
            }
        }); 
    }


    if (event.data == 'cross_domain_23'){
        parent.layer.closeAll();
        // 下了又下弹窗
        parent.showRepeatDownload(parent.window.location.href, "2");
    }

    if (event.data == 'cross_domain_24'){
        parent.layer.open({
            type: 2,
            title: false,
            resize: false,
            area: ['460px', '320px'],
            content: [objSite.getUserUrl('/account/Account_Status_Layout/index?status=2'), 'no'],
        });
    }

    if (event.data == 'cross_domain_25'){
        parent.layer.open({
            type: 2,
            title: false,
            resize: false,
            area: ['460px', '320px'],
            content: [objSite.getUserUrl('/account/Account_Status_Layout/index?status=3'), 'no'],
        }); 
    }

    if (event.data == 'cross_domain_26'){
        parent.layer.open({
            type: 2,
            title: false,
            resize: false,
            area: ['460px', '320px'],
            content: [objSite.getUserUrl('/account/Account_Status_Layout/index?status=1'), 'no'],
        }); 
    }

    if (event.data.name == 'cross_domain_27'){
        var grouping = '';
        parent.layer.open({
            type: 2, // 1（页面层）2（iframe层）
            title: false,
            skin: 'layer-nobg layer-pay-pop', //自定义皮肤类
            area: ['660px', '640px'], //宽高
            content:event.data.url || objSite.getServiceUrl('/lb-pay-new-layout.html?newthat=187&ll_id='+$('#ll_id').val()+grouping),
            cancel: function cancel(index, layero) {
                // addCoupon(3, 15);
                // open_limit = false;
            }
        });
    }

    if (event.data.name == 'cross_domain_28'){

        var type = 1;
        var cz_channel = 2;
        var cz_source = 0;
        var activity_id = 0;
        var entrance_cz = 130;
        var area = event.data.area || ['1000px', '610px'];
        parent.layer.open({
            type: 2,
            skin: 'new-layer-nobg layer-activity-bg',
            title: false,
            resize: false,
            area: area,
            content:event.data.url || objSite.getServiceUrl('/pay/new_vip_page/index?type=' + type + '&cz_channel=' + cz_channel + '&cz_source=' + cz_source + '&activity_id=' + activity_id + '&entrance=' + entrance_cz),
            cancel: function(index, layero) {
                
    
              
            }
        });
    }

    // 5月份一折购充值弹窗活动
    if (event.data.name == 'cross_domain_28_1'){

        var type = 1;
        var cz_channel = 2;
        var cz_source = 0;
        var activity_id = 0;
        var entrance_cz = 130;
        parent.layer.open({
            type: 2,
            skin: 'new-layer-nobg',
            title: false,
            resize: false,
            area: ["900px", "593px"],
            content:event.data.url || objSite.getServiceUrl('/pay/new_vip_page/one_discount?type=' + type + '&cz_channel=' + cz_channel + '&cz_source=' + cz_source + '&activity_id=' + activity_id + '&entrance=' + entrance_cz),
            cancel: function(index, layero) {



            }
        });
    }



    if (event.data == 'cross_domain_29'){
        if(parent.$('.new-work-index').length!=0||parent.$('#vr-edit-detail-id').length!=0){
            parent.window.location.reload();
        }
    }

    if (event.data == 'cross_domain_30'){
        parent.ThirdPlatformWebView.updateBalance();
        parent.ThirdPlatformWebView.closeWnd();  
    }

    if (event.data == 'cross_domain_31'){
        parent.window.location.href = objSite.getUserUrl('/pay/index_list/index');
    }
    if (event.data == 'cross_domain_32'){
        parent.window.location.href = objSite.getUserUrl('pay/xuanran_list/index');
    }
    if (event.data == 'cross_domain_33'){
        parent.window.location.href = objSite.getUserUrl('pay/plug_list/index');
    }
    if (event.data == 'cross_domain_34'){
        parent.window.location.href = objSite.getUserUrl('pay/mall_list/index');
    }

    if (event.data == 'cross_domain_35'){
        parent.layer.closeAll();
        // 下了又下弹窗
        parent.showRepeatDownload(parent.window.location.href, "3");
    }

    if (event.data == 'cross_domain_36'){
        parent.layer.closeAll();
        // 下了又下弹窗
        parent.showRepeatDownload(parent.window.location.href,"1");  
    }
    if (event.data == 'cross_domain_37'){
        parent.layer.closeAll();
        // 下了又下弹窗
        parent.showRepeatDownload(parent.window.location.href,"2");  
    }

    if (event.data.name == 'cross_domain_38'){
        var newthat = 0;
        parent.layer.open({
            type: 2, // 1（页面层）2（iframe层）
            title: false,
            skin: 'layer-nobg layer-pay-pop', //自定义皮肤类
            area: ['660px', '640px'], //宽高
            content:event.data.url || objSite.getServiceUrl('/lb-pay-new-layout.html?newthat=' + newthat),
            cancel: function cancel(index, layero) {
                // addCoupon(3, 15);
                // open_limit = false;
            }
        }); 
    }

    if (event.data.name == 'cross_domain_39'){
        var newthat = event.data.data || 0;
        var data_first = event.data.data_first || $("#first").val();
        var areaArr = event.data.areaArr || ['900px', '693px'];
        var _url = event.data.url ||  objSite.getServiceUrl('/lb-pay-layout.html?entrance=' + newthat + '&first=' + data_first);
        var wfw = parent.layer.open({
            type: 2, // 1（页面层）2（iframe层）
            title: false,
            id: '', // 弹窗唯一id
            skin: 'layer-nobg', //自定义皮肤类
            closeBtn: '1', //配置1和2来展示，如果不显示，则closeBtn: 0
            area: areaArr, //宽高
            content: _url,
            cancel: function (index, layero) {
                // open_limit = false;
                // addCoupon(3, 15);
                // 这里先要知道，这个用户是不是新用户
                var isNewUser = $("#is_recharge_user").val();
                var first = $("#first").val();
                var modelId = $("#ll_id").val();

                if (isNewUser === "1" && first === "1") {
                    parent.layer.closeAll();
                    parent.layer.open({
                        type: 2, // 1（页面层）2（iframe层）
                        title: false,
                        id: '', // 弹窗唯一id
                        skin: 'layer-nobg', //自定义皮肤类
                        closeBtn: 0, //配置1和2来展示，如果不显示，则closeBtn: 0
                        area: ['408px', '680px'], //宽高
                        content: objSite.getUserUrl('/download/www_form/webSys?ll_id=' + modelId)
                    });
                } else { }

               
            },
            end: function (index, layero) {
                // open_limit = false;
            }
        }); 
    }

    if (event.data == 'cross_domain_40'){
        // parent.window.objSite.loginInHtml(res);
        parent.layer.closeAll();
        //绑定手机
        parent.layer.open({
            type: 2,
            area: ['380px', '370px'],
            content: [objSite.getUserUrl('/login/bind_phone'), 'no'],
            title: false,
        });
    }

    if (event.data == 'cross_domain_41'){
        parent.layer.open({
            type: 2,
            skin: 'layer-nobg',
            area: ['802px', '541px'],
            content: [objSite.getUserUrl('/user/coming_home'), 'no'],
            title: false,
            cancel: function (index, layero) {
                parent.layer.closeAll();
                parent.location.reload();
            }
        });
    }

    if (event.data.name == 'cross_domain_42' || event.data == 'cross_domain_42'){
        let u='';
        if(typeof event.data.user_id =='number'){
            u = '&u='+event.data.user_id;
        }
        parent.layer.closeAll();
        var sc_parameter=event.data.sc_parameter || '';
        //冻结用户
        parent.layer.open({
            type: 2,
            area: ['400px', '520px'],
            content: [objSite.getUserUrl('/account/security/unsealing?m=1&t=' + (new Date()).valueOf())+u+sc_parameter, 'no'],
            title: false,
            closeBtn: 0
        }); 
    }

    if (event.data.name == 'cross_domain_421' || event.data == 'cross_domain_421'){
        let u='';
        if(typeof event.data.user_id =='number'){
            u = '&u='+event.data.user_id;
        }
        parent.layer.closeAll();
        var sc_parameter=event.data.sc_parameter || '';
        //冻结用户
        parent.layer.open({
            type: 2,
            area: ['400px', '520px'],
            content: [objSite.getUserUrl('/account/security/unsealing?m=1&l=1&t=' + (new Date()).valueOf())+u+sc_parameter, 'no'],
            title: false,
            closeBtn: 0
        });
    }

    if (event.data == 'cross_domain_43'){
        // 关闭所有弹窗层
        parent.layer.closeAll();
        var callBackUrl = window.parent.document.URL;
        var url = objSite.getUserUrl('/login/wx_login?llurl=' + encodeURIComponent(callBackUrl) + '&is_ground=1');
        parent.window.location.href = objSite.getUserUrl(url);
    }

    if (event.data == 'cross_domain_44'){
        var user_ids = 0;
        parent.layer.open({
            type: 2,
            title: false,
            resize: false,
            area: ['460px', '320px'],
            content: [objSite.getUserUrl('/account/Account_Status_Layout/index?status=1&user_id='+user_ids), 'no'],
        }); 
    }

    if (event.data == 'cross_domain_45'){
        parent.layer.closeAll();
        parent.layer.open({
          type: 1, // 1（页面层）2（iframe层）
          title: false,
          id: '', // 弹窗唯一id
          skin: 'layer-nobg', //自定义皮肤类
          closeBtn: '1', //配置1和2来展示，如果不显示，则closeBtn: 0
          area: ['363px', '332px'], //宽高
          content: parent.$('.js_cash_back_timer') //  $('#id') 、str
        });
    }


    if (event.data.name == 'cross_domain_46'){

        var resdata = event.data.data;

        parent.layer.closeAll();
        // 安全验证
        parent.layer.open({
            type: 2,
            area: ['380px', '322px'],
            content: [objSite.getUserUrl('/account/security/forceverify?fv=' + resdata), 'no'],
            title: false,
            closeBtn: 0
        });
    }

    if (event.data.name == 'cross_domain_47'){

        var resdata = event.data.data;
        var resdatak = event.data.k;

        parent.layer.closeAll();
        //冻结用户
        parent.layer.open({
            type: 2,
            area: ['380px', '274px'],
            content: [objSite.getUserUrl('/validate/Phone_Code_Validate/index?data=' + resdata  + '&k=' + resdatak), 'no'],
            title: false,
            closeBtn: 0
        }); 
    }

    if (event.data.name == 'cross_domain_48'){

        var resdata = event.data.data;
        var resdatak = event.data.k;

        parent.layer.closeAll();
        //强制绑定手机
        parent.layer.open({
            type: 2,
            area: ['380px', '271px'],
            content: [objSite.getUserUrl('/login/must_bind_phone/index?data=' + resdata + '&k=' + resdatak), 'no'],
            title: false,
        }); 
    }



    if (event.data == 'cross_domain_50'){
        parent.showRepeatDownload(parent.window.location.href, "2");//新类目下载成功后下载地址
    }

    if (event.data.name == 'cross_domain_51'){
        var restypenew = event.data.data;
        parent.lingganShowRepeatDownload('', '', restypenew);//旧类目下载成功后返回下载地址
    }


    if (event.data.name == 'cross_domain_52'){
        var searchActionId = parent.$('#searchActionId').val() || '';
        var sotuActionId = parent.$('#sotuActionId').val() || '';
        var kw = parent.$('#searchKeyword').val() || '';
        var rlai = parent.$('#rlai').val() || '';
        var collect = parent.$('#collect').val() || '';
        //列表页AB下载埋点
        var st = parent.$('#st').val() || 0;
        var actid = parent.$('#actid').val() || '';
        var ll_id = parent.$('#ll_id').val();
        var res_type = parent.$('#res_type').val();


        var data_first = event.data.data || '';
        var dl_course = event.data.dl_course || '';

        parent.layer.open({
            type: 2, // 1（页面层）2（iframe层）
            title: false,
            skin: 'layer-nobg layer-pay-pop', //自定义皮肤类
            area: ['603px', '406px'], //宽高
            content: objSite.getUserUrl('/download/www_form/scan?ll_id=' + ll_id + '&actid=' + actid + '&action_id=' + searchActionId + '&sotuActionId=' + sotuActionId + '&kw=' + kw + '&rlai=' + rlai + '&collect=' + collect + '&dl_course=' + dl_course + '&first=' + data_first + '&st=' + st + "&res_type=" + res_type),
        });
    }


    if (event.data.name == 'cross_domain_53'){

        var areaArr = event.data.areaArr || '';
        var newthat = event.data.newthat || '';
        var data_first = event.data.data_first || '';

        var wfw = parent.layer.open({
            type: 2, // 1（页面层）2（iframe层）
            title: false,
            id: '', // 弹窗唯一id
            skin: 'layer-nobg', //自定义皮肤类
            closeBtn: '1', //配置1和2来展示，如果不显示，则closeBtn: 0
            area: areaArr, //宽高
            content: objSite.getServiceUrl('/lb-pay-layout.html?entrance=' + newthat + '&first=' + data_first),
            end: function (index, layero) {
                // open_limit = false;
            }
        });
    }

    if (event.data.name == 'cross_domain_54'){

        var datares = event.data.data || '';
        var _area = event.data.area || '';
        var actid = event.data.actid || '';
        parent.layer.open({
            type: 2, // 1（页面层）2（iframe层）
            title: false,
            skin: 'layer-nobg layer-pay-pop', //自定义皮肤类
            area: _area, //宽高
            content: objSite.getServiceUrl(datares),
            cancel: function cancel (index, layero) {
                // open_limit = false;
                // if(actid == 'sem_pay_layer' && $.cookie('sem_pay6_ad_show') != '1'){
                //     $.ajax({
                //         url: objSite.getServiceUrl('/activityunion/sem_active/couponInfo'),
                //         type: 'GET',
                //         dataType: 'json',
                //          xhrFields: {
                //             withCredentials: true
                //           },
                      
                //         success: function (res) {
                //           if (res.status == 1 && res.data!= null) {
                //             if(res.data.coupon_status != 0)return;
                //                 parent.layer.open({
                //                     type: 1, // 1（页面层）2（iframe层）
                //                     title: false,
                //                     skin: 'layer-nobg layer-pay-pop', //自定义皮肤类
                //                     area: ['563px', '494px'], //宽高
                //                     content: `
                //                         <div class="sem-ad-lyaer"></div>
                //                     `,
                //                     success: function(layero, index){
                //                     // 计算当天23:59:59的时间
                //                     $.cookie('sem_pay6_ad_show', '1', { expires: new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1), path: '/',domain: '3d66.com' });
                //                         $('.sem-ad-lyaer').click(function(){
                //                             // 极跨处理
                //                             var objToSend = {
                //                                 name: 'cross_domain_54',
                //                                 area: _area,
                //                                 data:'/lb-pay-new-layout-sem.html?res_type='+parent.$('#res_type').val(),
                //                                 actid: 'sem_pay_layer',
                //                             };
                //                             parent.window.postMessage(objToSend, '*');
                //                         })
                //                     },
                //                     cancel: function(index, layero){
                //                         var content ={
                //                             name:'cross_domain_110',
                //                             data:res,
                //                             type:2
                //                         };
                //                         parent.window.postMessage(content, '*');
                //                     }
                //                 });
                //           }
                //         }
                //     })
                    
                // }
            }
        }); 
    }

    if (event.data == 'cross_domain_55'){
        parent.layer.closeAll();
        window.parent.initialCharge();
    }

    if (event.data.name == 'cross_domain_56'){

        var openUrl = event.data.data || '';
        var areaArr = event.data.areaArr || '';
        parent.layer.open({
            type: 2, // 1（页面层）2（iframe层）
            title: false,
            id: '', // 弹窗唯一id
            skin: 'layer-nobg', //自定义皮肤类
            closeBtn: '1', //配置1和2来展示，如果不显示，则closeBtn: 0
            area: areaArr, //宽高
            content: openUrl,
            cancel: function cancel(index, layero) {
                // addCoupon(3, 15);
            }
        });
    }


    if (event.data == 'cross_domain_57'){
        parent.layer.closeAll();
        parent.objSite.newVipPopup(1,2);
    }

    if (event.data == 'cross_domain_58'){
          //充值活动
          var link_url = $('#get_lb_zd').val();
          parent.$('.div_new_alert .div_suc .p_cont').text(link_url);
          parent.layer.closeAll();
          parent.$('.div_new_alert,.div_suc').show();
    }

    if (event.data == 'cross_domain_59'){
        parent.layer.open({
            type: 1, // 1（页面层）2（iframe层）
            title: false,
            id: '', // 弹窗唯一id
            skin: 'layer-nobg', //自定义皮肤类
            closeBtn: '1', //配置1和2来展示，如果不显示，则closeBtn: 0
            area: ['363px', '332px'], //宽高
            content: parent.$('.js_cash_back') //  $('#id') 、str
          });
    }

    if (event.data.name == 'cross_domain_60'){
        var url_ = event.data.data;
        parent.window.open('_blank').location = url_
    }

    if (event.data.name == 'cross_domain_61'){
        var id_ = event.data.data;
        parent.layer.open({
            type: 2,
            closeBtn:1,
            title:'',
            skin: 'layer-nobg', //加上边框
            area: ['797px', '442px'], //宽高
            content: objSite.getServiceUrl('/pay/pay_popup?vip_id='+id_),
            success: function(layero, index){}
        }); 
    }

    if (event.data.name == 'cross_domain_62'){
        var data_ = event.data.data;
        var k_ = event.data.k;
        //绑手机
        parent.layer.open({
            type: 2,
            title: false,
            resize: false,
            area: ['380px', '271px'],
            content: [objSite.getUserUrl('/login/must_bind_phone/index?data=' + data_ + '&k=' + k_), 'no'],
        });
    }

    if (event.data.name == 'cross_domain_63'){
        var link_url = event.data.data;
        parent.$('.div_new_alert .div_suc .p_cont').text(link_url);
        parent.layer.closeAll();
        parent.$('.div_new_alert,.div_suc').show();
    }

    if (event.data == 'cross_domain_64'){
        parent.window.location.href = objSite.getUserUrl('/pay/index_list/index');
    }

    if (event.data == 'cross_domain_65'){
        parent.layer.closeAll();
        parent.objSite.openUserWin('/login/popover/welcome', ['750px', '498px']);
    }

    if (event.data.name == 'cross_domain_66'){

        var url = event.data.data;
        var classname = event.data.classname;

        parent.layer.open({
            type: 2,
            title: false,
            resize: false,
            area: ['800px', '430px'],
            content: url,
            success: function (layero, index) {
                var body = parent.layer.getChildFrame('body', index);
                var iframeWin = window[layero.find('iframe')[0]['name']];
                body.find('.left').addClass(classname);
            },
            cancel: function (index, layero) {
                
            }
        });
    }

    if (event.data.name == 'cross_domain_67'){

        var url = event.data.data;
        var classname = event.data.classname;
        parent.layer.open({
            type: 2,
            title: false,
            resize: false,
            area: ['800px', '430px'],
            content: url,
            success: function (layero, index) {
               
                var body = layer.getChildFrame('body', index);
                var iframeWin = window[layero.find('iframe')[0]['name']];
                var leftEl = $(layero.find('iframe')[0].contentWindow.document.body).find('.left')
                body.find('.left').addClass(classname);
                // 两个弹窗重叠判断
                if(!leftEl.hasClass(classname)){
                    leftEl.addClass(classname)
                }    
            },
            cancel: function (index, layero) {
                
            }
        }); 
    }


    if (event.data == 'cross_domain_68'){
        parent.layer.closeAll();
        window.parent.initialCharge();
    }

    if (event.data.name == 'cross_domain_69'){

        var areaArr = event.data.data;
        var openUrl = event.data.openUrl;
        parent.layer.open({
            type: 2, // 1（页面层）2（iframe层）
            title: false,
            id: '', // 弹窗唯一id
            skin: 'layer-nobg', //自定义皮肤类
            closeBtn: '1', //配置1和2来展示，如果不显示，则closeBtn: 0
            area: areaArr, //宽高
            content: openUrl,
            cancel: function cancel(index, layero) {
                // addCoupon(3, 15);
            }
        });
    }

    if (event.data.name == 'cross_domain_70'){
        var resmsg = event.data.data;
        var wxLogin = event.data.wxLogin;

        if(parent.$('.js_wx_binding').get(0)){
            parent.$('.js_wx_binding').hide();
            parent.$('.js_wx_switch').show();
             clearInterval(wxLogin);
            parent.layer.msg(resmsg);
            parent.$('#input_wx_binding').val(1);
            return;
        }
    }

    if (event.data.name == 'cross_domain_71'){
        var resdata = event.data.data;
        var kdata = event.data.k;

        // 关闭所有弹窗层
        parent.layer.open({
            type: 2,
            area: ['380px', '274px'],
            content: [objSite.getUserUrl('/validate/phone_code_validate/index?data=' + resdata + '&k=' + kdata), 'no'],
            title: false,
            closeBtn: 0
        });
    }

    if (event.data.name == 'cross_domain_72'){
        var resdata = event.data.data;
        var kdata = event.data.k;

        parent.layer.open({
            type: 2,
            title: false,
            resize: false,
            area: ['380px', '271px'],
            content: [objSite.getUserUrl('/login/must_bind_phone/index?data=' + resdata + '&k=' + kdata), 'no'],
        });
    }


    if (event.data == 'cross_domain_73'){
        parent.layer.open({
            type: 2,
            area: ['400px', '520px'],
            content: [objSite.getUserUrl('/account/security/unsealing?m=1&t=' + (new Date()).valueOf()), 'no'],
            title: false,
            closeBtn: 0
        });
    }

    if (event.data == 'cross_domain_74'){
        parent.layer.open({
            type: 2,
            area: ['400px', '520px'],
            content: [objSite.getUserUrl('/account/security/unsealing?m=1&l=1&t=' + (new Date()).valueOf()), 'no'],
            title: false,
            closeBtn: 0
        });
    }

    if (event.data.name == 'cross_domain_75'){
        var resdata = event.data.data;
        parent.layer.open({
            type: 2,
            area: ['380px', '322px'],
            content: [objSite.getUserUrl('/account/security/forceverify?fv=' + resdata), 'no'],
            title: false,
            closeBtn: 0
        });
    }

    if (event.data.name == 'cross_domain_76'){
        var resdata = event.data.data;
        if(getQueryVariable('reslogin') == '10001'){
        }else if(pageUrl.indexOf("reslist") > -1){
          // 判断是否是新版列表页·搜索结果页
          parent.layer.msg(resdata);
          setTimeout(function(){
            parent.layer.closeAll();
          },1000);
        }else{
          parent.window.location.reload();
        }
    }

    if (event.data.name == 'cross_domain_77'){
        var resdata = event.data.data;
        parent.layer.msg(resdata);
    }

    if (event.data.name == 'cross_domain_78'){
        var resdata = event.data.data;
        parent.window.location.href = resdata;
        parent.layer.closeAll();
    }

    if (event.data == 'cross_domain_79'){
        parent.layer.open({
            type: 2,
            resize: false,
            title: "人机验证，需要绑定微信后才能继续访问",
            area: ['500px', '500px'],
            content: [getUserUrl('/login/wechat_login/officialAccountLoginOpen?site=1&behavior=bindAccount'), 'no'],
        });
    }


    // getQueryVariable取值
    if (event.data.name == 'cross_domain_80'){
        var query = parent.window.location.search.substring(1);
        $.cookie('cross_domain_variable', query, {
            expires: 1,
            domain: '3d66.com',
            path: '/'
        });
    }

    if (event.data == 'cross_domain_81'){
        // 登录业务事件增加登录页面的url上报
        var orTheUrlOfTheLoginPage = parent.window.location.href;
        $.cookie('login_site_view_url', orTheUrlOfTheLoginPage, { path: '/', domain: '3d66.com' });
    }

    if (event.data.name == 'cross_domain_82'){

        
        var url = event.data.data;
        var classname = event.data.classname;
        var package_id = event.data.package_id;
        
        parent.layer.open({
            type: 2,
            title: false,
            resize: false,
            area: ['800px', '480px'],
            content: url,
            success: function (layero, index) {

                // try {
                //     var body = parent.layer.getChildFrame('body', index);
                //     var iframeWin = window[layero.find('iframe')[0]['name']];
                //     var leftEl = $(layero.find('iframe')[0].contentWindow.document.body).find('.left')
                //     body.find('.left').addClass(classname);

                //     // 两个弹窗重叠判断
                //     if(!leftEl.hasClass(classname)){
                //         leftEl.addClass(classname)
                //     }
                // } catch (error) {
                //     console.log(error);
                // }
                

            },
            cancel: function (index, layero) {
                if(package_id){
                     //嘉伟挽留弹窗配置
                     var content ={
                        name:'cross_domain_111',
                        package_id:package_id,
                        position:2,
                    };
                    parent.window.postMessage(content, '*');
                }
            }
        });
    }

    if (event.data == 'cross_domain_101'){
        parent.notUsedCoupon();
    }
    if (event.data.name == 'cross_domain_102'){
        var _url = event.data.url;
        var _area = event.data.area;
        parent.layer.open({
            type: 2,
            title: false,
            resize: false,
            skin: 'layer-nobg lyk-layer-skin', //加上边框
            closeBtn:1,
            area: _area,
            content: [_url, 'no'],
        });
    }
    // 提交素材纠纷成功
    if (event.data == 'cross_domain_103'){
        setTimeout(function(){
            parent.layer.closeAll();
        }, 2000)
    }
    // 提交素材关闭
    if (event.data == 'cross_domain_104'){
        parent.layer.closeAll();
    }
    // 提交素材查看示列
    if (event.data.name == 'cross_domain_105'){
        if(event.data.close == 0){
            event.data.close +=1;
            parent.layer.open({
                type: 1, // 1（页面层）2（iframe层）
                title: false,
                id: '', // 弹窗唯一id
                skin: 'layer-nobg', //自定义皮肤类
                closeBtn: 1, //配置1和2来展示，如果不显示，则closeBtn: 0
                area: ['895px', '491px'], //宽高
                content: '<div class="report-demo"><img src="'+ event.data.url +'" alt=""></div>'
            });
        }
    }


    // 签到弹窗
    if (event.data == 'cross_domain_106'){
        $(window.parent.document).find(".sign-in-title .red").text(parseInt($(window.parent.document).find(".sign-in-title .red").text().trim())+1)
    }


    // 签到奖励去使用
    if (event.data == 'cross_domain_107'){
        parent.openLottery();
    }

    // 极跨处理：父级页面跳转
    if (event.data.name == 'cross_domain_108') {
        parent.location.href = event.data.url ;
    }
    //强哥免费5次下载活动弹窗，下载通用券或者折扣券使用成功后触发
    if (event.data.name == 'cross_domain_109') {
        if(event.data.type){
            parent.freeDownloadRechargeLayer(event.data.type, event.data.is_recharge_xzb);
        }else{
            parent.detailsAdvFreeDownloadRecharge(event.data.source || 2);
        }
        
    }
        
    // 极跨处理：sem活动点击关闭6元挽留弹窗时处理
    if (event.data.name == 'cross_domain_110') {
        if($.cookie('sem_detail_ad_show')  != '1' && $.cookie('sem_pay6_ad_show') == '1' && $(".sem-ad-box").length == 0){
            let res = event.data.data;
            let html = `<div class="sem-ad-box" style="display:none;">
                    <div class="sem-ad-close"></div>
                        <div class="time"></div>
                    </div>`
            parent.$("body").append(html); 
            setTimeout(() => {
                if(parent.$(".free-download-activity-adv").length == 0){//强哥活动的右上角是否在
                    // $(".sem-ad-box").css("top",'300px');
                    parent.$(".sem-ad-box").show();
                }
            }, 1000);
            // 点击弹窗
            parent.$(document).on('click','.sem-ad-box',function(e){
                var objToSend = {
                    name: 'cross_domain_54',
                    area: ['731px', '527px'],
                    data:'/lb-pay-new-layout-sem.html?res_type='+parent.$('#res_type').val(),
                    actid: 'sem_pay_layer',
                };
                parent.window.postMessage(objToSend, '*');
            })
            // 关闭弹窗
            parent.$(document).on('click','.sem-ad-box .sem-ad-close',function(e){
                e.stopPropagation();
                e.preventDefault();
                // 计算当天23:59:59的时间
                $.cookie('sem_detail_ad_show', '1', { expires: new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1), path: '/' ,domain: '3d66.com' });
                $(this).parent().remove();
            })
            // 计算当天24小时倒计时
            let timer = setInterval(() => {
                let nowTime = parseInt((new Date().getTime()) / 1000);
                let leftTime = res.data.coupon_end_time - nowTime;
                if (leftTime < 0) {
                    clearInterval(timer);
                    parent.$(".sem-ad-box").remove();
                } else {
                    let day = Math.floor(leftTime / (24 * 60 * 60));
                    let hour = Math.floor((leftTime % (24 * 60 * 60)) / (60 * 60));
                    hour = hour < 10 ? '0' + hour : hour;
                    let minute = Math.floor((leftTime % (60 * 60)) / 60);
                    minute = minute < 10 ? '0' + minute : minute;
                    let second = Math.floor(leftTime % 60);
                    second = second < 10 ? '0' + second : second;
                    parent.$(".sem-ad-box .time").text(`${day}天${hour}时${minute}分${second}秒`);
                }
            }, 1000);
        }
        
    }
    // 极跨处理：嘉伟挽留弹窗
    if(event.data.name == 'cross_domain_111'){
        let package_id = event.data.package_id;
        let position = event.data.position;//1详情页 2活动页
        if ($.cookie('retain-layer-position'+position) != 1 && package_id) {
            $.ajax({
              url: objSite.getServiceUrl('/api/v1/recharge/retain/index'),
              type: 'GET',
              dataType: 'json',
              data: { package_id, position: position, },
              xhrFields: {
                withCredentials: true
              },
              success: function (res) {
                $.removeCookie('retain_package_id',{
                    domain: '3d66.com',
                    path: '/'
                });
                if (res.code == 1) {
                  var content ={
                      name:'cross_domain_56',
                      data:objSite.getServiceUrl('/activity/recharge_retain/index?id=' + res.data.id),
                      areaArr: ['480px', '700px'],
                  };
                  parent.window.postMessage(content, '*');
                  $.cookie('retain-layer-position'+position, '1', { 
                    expires: new Date(res.data.expire_time * 1000),
                    domain: '3d66.com',
                    path: '/'
                 });
                }
              }
            })
          }
    }
    // 极跨处理：处理父页面插入dom
    if (event.data.name == 'body_append_html') {
        var dom_html = event.data.dom_html;
        var type = event.data.type;
        parent.$("body").append(dom_html); 
    }


    // 极跨处理：父级页面重载关闭
    if (event.data == 'cross_domain_5_foot') {
        window.top.close();
        window.opener.parent.layer.closeAll();

        // 临时处理登录落地页不刷新的问题 
        if(window.opener.parent.location.href.indexOf('vr_platform') > -1 || window.opener.parent.location.href.indexOf('ai_platform') > -1){
        }else{
          if(window.opener.parent.location.hostname == 'usertest.3d66.com' || window.opener.parent.location.hostname == 'user.3d66.com'){
            window.opener.parent.location.reload();
          }
        }
    }
    // 极跨处理：获取父页面参数
    if (event.data.name == 'get_parent_page_val') {
        var dom = event.data.dom;
        var attr = event.data.attr;
        if(!attr){
            var val = parent.$(dom).val();
            return val;
        }
        var val = parent.$(dom).attr(attr);
        return val;
    }


    // 首页弹窗新人首冲
    if (event.data == 'cross_domain_151'){

        let activity_id = '&activity_id=104';
        let currency_location = '&currency_location=13';
        parent.layer.open({
            type: 2, // 1（页面层）2（iframe层）
            title: false,
            skin: 'layer-nobg layer-pay-pop', //自定义皮肤类
            area: ['660px', '640px'], //宽高
            content:objSite.getServiceUrl('/lb-pay-new-layout.html?newthat=194' + activity_id + currency_location),
            cancel: function cancel(index, layero) {
            }
        }); 
    }

    // 下载弹窗中广告打开灵感会员弹窗
    if (event.data.name == 'cross_domain_plus_member'){
        try {
            parent.layer.closeAll();
            parent.openPopMember.openPlusVipPop({
                entrance:event.data.entrance, // 新增枚举：9：导航栏，10：底部快捷菜单，11：下载按钮  12：下载弹窗广告
                url:event.data.url
            });
        } catch (error) {
                console.log(error);
        }
    }

    // 新类目下载成功后需改变详情优惠提示  其他类目单独新增 该文件只有方案文本在使用
    if(event.data.name == 'cross_inspirations_download'){
        parent.layer.closeAll();
        // 下了又下弹窗
        parent.showRepeatDownload(parent.window.location.href, "3");
        try{
            // 3-用户重复下载永久免费，4-三天内重复下载免费，18-已下载模型灵感PLUS会员重复下载永久免费
            if($('.material-discount-information').length==0){
                let down_text= event.data.user.is_all_vip || event.data.user.is_inspirations_vip ? '免费重复下' : '已下载图片3天内免费重复下';
                $('.material-info .list-infos').append(`<li class="material-discount-information">
                    优&emsp;&emsp;&emsp;&emsp;惠
                    <span>${down_text}</span>
                </li>`);
                $('.download-center .download-price').remove();
                $('.download-center .download-now').html(`<span style="color:#ffff00">免费</span> 下载`);
            }
        }catch (error) {}
    }


    // 绑定手机
    if (event.data.name == 'cross_domain_160') {
        var res = event.data.res;
        parent.layer.closeAll();
        parent.window.objSite.loginInHtml(res);
        parent.window.location.reload();
    }



    // 抽奖弹窗跳转充值
    if(event.data.name == 'cross_jump_recharge'){
        parent.layer.closeAll();
        // 下了又下弹窗
        parent.window.open(event.data.url, '_blank');
    }

    //  黑盒限制绑定微信回调
    if (event.data == 'user_blackbox_captcha'){
        parent.layer.closeAll();
        if($('.user_blackbox_captcha').length!=0){
            $('.user_blackbox_captcha').html('<span style="color:#06cd65;cursor: pointer;font-weight: bold;">继续加载</span>').attr('data-type',1);
        }else{
            parent.location.reload();
        }
    }

    // 选择账号
    if (event.data && event.data.name == 'cross_domain_select_account'){
        var res = event.data.data;
        parent.layer.open({
            type: 2,
            title: false,
            resize: false,
            skin: 'layer-nobg',
            area: ['432px', '564px'],
            content: [objSite.getUserUrl(`/loginv2/popover/select_account?token=${res.token}&sign=${res.sign}` ), 'no'],
        });
    }

    // 绑定手机号码
    if (event.data && event.data.name == 'cross_domain_bind_phone'){
        var res = event.data.data;
        parent.layer.closeAll();
        parent.layer.open({
            type: 2,
            title: false,
            resize: false,
            skin: 'layer-nobg',
            area: ['432px', '564px'],
            content: [objSite.getUserUrl(`/loginv2/popover/bind_phone?token=${res.token}&sign=${res.sign}` ), 'no'],
        });
    }

    // 切换账号
    if (event.data && event.data.name == 'cross_domain_change_account'){
        parent.layer.open({
            type: 2,
            title: false,
            resize: false,
            skin: 'layer-nobg',
            area: ['432px', '564px'],
            content: [objSite.getUserUrl(`/loginv2/popover/change_account`), 'no'],
        });
    }

    // 新版登录弹窗 - 登录密码错误限制解封来源
    if (event.data.name == 'cross_domain_login_v2' || event.data == 'cross_domain_login_v2') {
        var sc_parameter=event.data.sc_parameter || '';
        parent.layer.closeAll();
        parent.objSite.openUserWin('/login/popover/welcome'+sc_parameter, ['792px', '564px']);
    }

    // 新黑盒
    if (event.data && event.data.name == 'cross_domain_black'){
        parent.layer.open({
            type: 1, // 1（页面层）2（iframe层）
            title: false,
            id: '', // 弹窗唯一id
            skin: 'layer-nobg', //自定义皮肤类
            closeBtn: '1', //配置1和2来展示，如果不显示，则closeBtn: 0
            area: ['455px', '330px'], //宽高
            content: event.data.data //  $('#id') 、str
        });
    }

    // 5月份一折购充值弹窗活动
    if (event.data == 'cross_domain_one_discount_activity'){
        parent.layer.closeAll();
        layer.open({
            type: 2,
            title: false,
            closeBtn: 0,
            shadeClose: true,
            area: ['980px', '700px'],
            content: getServiceUrl('/activity202505/one_discount')
        });
    }
});