window.apiready = function() {
	// 状态栏
	var header = $api.dom('header', '.aui-bar-nav');
	$api.fixStatusBar(header);
};

var toAddCalendar = function() {
	var model = api.require('model');
	var formData = $form.getFormData();
	
	//	add to database
	api.showProgress({
		title : "正在添加..."
	});

	model.insert({
		class : 'calendar',
		values : {
			title : formData["cal_title"],
			start : formData["s_date"] + " " + formData["s_time"] + ":00",
			end : formData["e_date"] + " " + formData["e_time"] + ":00",
			user : formData["user"],
			supporter : formData["supporter"]
		}
	}, function(ret, err) {
		if (ret) {
			api.confirm({
				title : '提示',
				msg : "添加成功",
				buttons : ['返回', '继续']
			}, function(ret, err) {
				if (ret.buttonIndex == 1) {
					api.closeWin();
				}
			});
		} else {
			api.toast({
				msg : JSON.stringify(err)
			});
		}
		api.hideProgress();
	});
}