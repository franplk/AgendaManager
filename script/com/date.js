/*
 * JavaScript Library Customized For From Element
 * 
 * 日期，时间 JS库
 * 不依赖于任何其它库
 * 
 * */
(function(w) {
	
	var span = "-";
	
	var u = {};
	
	// 日期格式化
	Date.prototype.format = function (fmt) {
		var o = {
			"M+" : this.getMonth() + 1, //月份
			"d+" : this.getDate(), //日
			"h+" : this.getHours(), //小时
			"m+" : this.getMinutes(), //分
			"s+" : this.getSeconds(), //秒
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	};

	// 日期数字转换
	var getDouble = function(num) {
		if (num < 10) {
			return "0" + num;
		} else {
			return "" + num;
		}
	};
	
	// 在当前日期，加或减掉小时数
	u.getNextHours = function(hours, currDate) {
		var nowDate = currDate;
		if (!nowDate) {
			nowDate = new Date();
		}
		if (!days) {
			return nowDate;
		}
		return new Date(nowDate.getTime() + hours * 3600000);
	};

	// 在当前日期，加或减掉某些天数
	u.getNextDate = function(days, currDate) {
		var nowDate = currDate;
		if (!nowDate) {
			nowDate = new Date();
		}
		if (!days) {
			return nowDate;
		}
		return new Date(nowDate.getTime() + days * 24 * 3600000);
	};

	// 将日期转换为 date和time的字符串形式
	u.getDateAndTimeStr = function(fmt, span, dateObj) {
		if (!dateObj) {
			dateObj = new Date();
		}
		
		var dateStr = dateObj.format(fmt);
		
		span || (span = " ");
		var dateArr = dateStr.split(span);
		return {
			"dateStr" : dateArr[0],
			"timeStr" : dateArr[1]
		};
	};

	w.$date = u;

})(window);