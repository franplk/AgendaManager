/*
 * 页面（Window，Frame）的各种操作类库
 * 所有方法，需要在 apiready之后调用
 * @author Franplk
 * */
(function(w) {
	
	var u = {};
	
	// 页面刷新
	u.fresh = function () {
		location.reload();
	};
	
	// 双击退出,只用于Android
	u.doubleClickExit = function () {
		w.keyBackTime = 0;
		api.addEventListener({
        	name:'keyback'
	    }, function(ret,err) {
	    	w.keyBackTime += 1;
	    	if (w.keyBackTime == 2) {
	    		api.closeWidget({id: api.appId});
	            return;
	    	}
	    	api.toast({msg:'再点击一次退出应用'});
			setTimeout(function(){
				w.keyBackTime = 0;
			}, 3000);
	    });
	};
	
	// 登录判定
	u.loginAssert = function (pageParam) {
		var username = pageParam.username;
		if (!username) {
			api.openWin({
	            name: 'login',
	            url: 'widget://html/login.html'
	        });
	        return;
		}
		return username;
	};
	
	// 跳转模块首页 index.html
	u.toModule = function(moduleName, pageParam) {
		u.toPage(moduleName, "index", pageParam);
	};
	
	// 打开页面（某个模块下的某个页面）
	u.toPage = function(moduleName, pageName, pageParam) {
		pageParam || (pageParam = {});
		var pageUrl = "widget://html/" + moduleName + "/" + pageName + ".html";
		api.openWin({
			url : pageUrl,
			name : moduleName + "_" + pageName,
			pageParam : pageParam
		});
	};
	
	w.$page = u;
	
})(window); 