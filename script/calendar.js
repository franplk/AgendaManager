var listImg = "widget://image/listView/listImg.png";
var titleEl = document.getElementById('calendarMonth');
var model, query, calendar, listView;

// 就绪事件
window.apiready = function() {
	// 状态栏
	var header = $api.byId("aui-header");;
	$api.fixStatusBar(header);
	
	var frmWidth = api.frameWidth;
	
	// 日历位置
	rect_cal = {
		x : 0,
		y : 80,
		w : frmWidth,
		h : frmWidth
	};
	
	// 事件列表位置
	rect_list = {
		"x" : 0,
		"y" : frmWidth + 80,
		"w" : frmWidth
	}
	
	// 初始化组件
	model = api.require('model');
	query = api.require('query');
	calendar = api.require('UICalendar');
	listView = api.require('UIListView');
	
	// 初始化日历控件
	initCalendar();	
};

// 跳转添加日程窗口
var toAdd = function () {
	api.openWin({
        name: 'cal_add',
        reload: true,
        url: 'widget://html/uicalendar/add.html'
    });
};

// 打开日历
var initCalendar = function() {
	calendar.open({
		rect : rect_cal,
		styles : {
			date : {//（可选项）JSON对象，普通日期的样式
				size : 18 //（可选项）数字类型；普通日期文字的大小；默认：24
			},
			today : {//（可选项）JSON对象，设备当前日期的样式
				color : '#F00', //（可选项）字符串类型；当前日期的文字颜色，支持 rgb、rgba、#；默认：'#a8d500'
			},
			specialDate : {//（可选项）JSON对象，需要标记的特殊日期的通用样式
				color : '#3b3b3b', //（可选项）字符串类型；文字颜色，支持 rgb、rgba、#；默认：与普通日期文字颜色一致
			}
		},
		switchMode : 'horizontal',
		fixedOn : api.frameName,
		fixed : false
	}, function(ret, err) {
		calClickCallBack(ret, err);
	});
};

// 点击日程回调函数
var calClickCallBack = function(ret, err) {
	if (err) {
		alert(JSON.stringify(err));
		return;
	}
	var eventType = ret.eventType;
	if (eventType == 'show') {
		var calendarTime = ret.year + '年' + ret.month + '月';
		titleEl.innerHTML = calendarTime;

		// 初始化事件列表
		var currDate = ret.year + '-' + getDoubleStr(ret.month) + '-' + getDoubleStr(ret.day);
		queryEventList(currDate, true);
	} else if (eventType == 'switch') {
		var calendarTime = ret.year + '年' + ret.month + '月';
		$api.html(titleEl, calendarTime);
	} else if (eventType == 'normal' || eventType == 'special') {
		var currDate = ret.year + '-' + getDoubleStr(ret.month) + '-' + getDoubleStr(ret.day);
		queryEventList(currDate, false);
	}
};

var getDoubleStr = function (num) {
	if (num <= 9) {
		return "0" + num;
	}
	return "" + num;
};

// 查询指定日期的日程
var queryEventList = function(currDate, isInit) {
	query.createQuery(function(ret, err) {
		if (err) {
			api.toast({
                msg:'创建Query失败:' + JSON.stringify(err)
            });
            return;
		}
		var queryId = ret.qid;
		query.whereGreaterThan({
			qid : queryId,
			column : 'endDate',
			value : currDate
		});
		query.whereLessThan({
			qid : queryId,
			column : 'startDate',
			value : currDate
		});
		model.findAll({
			class : 'calendar',
			qid : queryId
		}, function(ret, err) {
			if (err) {
				api.toast({
                    msg:'查询日程失败:' + JSON.stringify(err)
                });
                return;
			}
			if (ret && ret.length == 0) {
				api.toast({
                    msg:'没有日程安排'
                });
			}
			if (isInit) {
				initListView(ret);
			} else {
				listView.reloadData({
					data : ret
				});
			}
		});
	});
};

// 初始化日程事件列表
var initListView = function(dataList) {
	var rightBtns = [{
		width : 70,
		title : '详  情',
		titleSize : 18,
		titleColor : '#000'
	}, {
		width : 70, // 默认：w / 4
		title : '删  除', // 按钮标题，水平、垂直居中
		titleSize : 18, // 按钮标题文字大小；默认：12
		titleColor : '#F00', // 标题文字颜色，默认：'#ffffff'
	}];

	// 显示列表
	listView.open({
		rect : rect_list,
		rightBtns : rightBtns,
		styles : {
			borderColor : '#000', //（可选项）字符串类型；列表分割线的颜色，支持 rgb、rgba、#；默认：'#696969'
			item : {//（可选项）JSON对象；列表项的样式
				bgColor : '#FFF', // 列表项的背景色， 默认：'#AFEEEE'
				activeBgColor : '#FFF', //（可选项）字符串类型；列表项按下时的背景色，支持 rgb、rgba、#；默认：'#F5F5F5'
				height : 55, //（可选项）数字类型；列表项的高度；默认：55
				imgWidth : 40, //（可选项）数字类型；列表项配图的宽度；默认：列表项的高度减去10px
				imgHeight : 40, //（可选项）数字类型；列表项配图的高度；默认：列表项的高度减去10px
				imgCorner : 10, //（可选项）数字类型；列表项配图的圆角大小；默认：0
				placeholderImg : '', //（可选项）字符串类型；列表项配图的占位图路径（本地路径，fs://、widget://），默认：APICloud 图标
				titleSize : 12, //（可选项）数字类型；列表项标题文字大小；默认：12
				titleColor : '#000', //（可选项）字符串类型；列表项标题文字颜色，支持 rgb，rgba，#；默认：'#000000'
				subTitleSize : 12, //（可选项）数字类型；列表项子标题文字大小；默认：12
				subTitleColor : '#000', //（可选项）字符串类型：列表项子标题文字颜色，支持 rgb、rgba、#；默认：'#000000'
			}
		},
		"data" : dataList,
		fixedOn : api.frameName
	}, function(ret, err) {
		tapDeploy(ret, err);
	});

	/* 设置下拉刷新. */
	listView.setRefreshHeader({
		bgColor : "#f5f5f5",
		showTime : false,
		loadingImg : "widget://image/listView/arrow.png"
	}, function(ret, err) {
		listView.reloadData({
			data : [{
				"imgPath" : listImg,
				"title" : "我的日程",
				"subTitle" : "学习学习"
			}]
		});
	});
	return listView;
};

// 列表回调函数
var tapDeploy = function(ret, err) {
	var eventType = ret.eventType;
	var msg;
	if ('show' == eventType) {
		msg = "加载成功";
	} else if ('clickRightBtn' == eventType) {
		var btn_idx = ret.btnIndex;
		if (0 == btn_idx) {
			doEdit(ret, err, "detail");
		} else if (1 == btn_idx) {
			doEdit(ret, err, "delete");
		}
	} else if ('clickContent' == eventType) {
		doEdit(ret, err, "detail");
	} else if ('clickImg' == eventType) {
		doEdit(ret, err, "detail");
	} else if ('clickRemark' == eventType) {
		doEdit(ret, err, "detail");
	}
};

var doEdit = function(ret, err, type) {
	listView.getDataByIndex({
		index : ret.index
	}, function(ret, err) {
		if (err) {
			return;
		}
		var calData = ret.data;
		if (type == "detail") {
			api.openWin({
				name : 'cal_detail',
				url : 'widget://html/uicalendar/detail.html',
				pageParam : calData
			});
		} else if (type == "delete") {
			var model = api.require('model');
			model.deleteById({
	            class:'calendar',
	            id:calData.id
            }, function(ret,err){
            	if (err) {
            		api.toast({
	                    msg:'删除失败：' + JSON.stringify(err)
                    });
                    return;
            	}
            	api.toast({
	                msg:'删除成功'
                });
            });
		}
	});
}; 