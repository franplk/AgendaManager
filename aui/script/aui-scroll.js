/**
 * 页面滚动监听
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

/** 
 * 使用方式
 *  var scroll = new pageScroll({
        listen:true,
        distance:200 //判断到达底部的距离，isToBottom为true
    },function(ret){
        if(ret.isToBottom){
            document.getElementById("demo").textContent = "已到达底部";
        }else{
            document.getElementById("demo").textContent = "滚动高度："+ret.scrollTop;
        }

    });
 */
(function(window) {
	'use strict';
	var isToBottom = false;
	var pageScroll = function (params,callback) {
		this.extend(this.params, params);
		this._init(params,callback);
	}
	pageScroll.prototype = {
		params: {
			listen:false,
            distance: 100
        },
		_init : function(params,callback) {
			var self = this;
			if(self.params.listen){
				document.body.addEventListener("touchmove", function(e){
					self.scroll(callback);
				});
				document.body.addEventListener("touchend", function(e){
					self.scroll(callback);
				});
			}
			window.onscroll = function(){
				self.scroll(callback);
			}
		},
		scroll : function (callback) {
			var self = this;
			var clientHeight = document.documentElement.scrollTop === 0 ? document.body.clientHeight : document.documentElement.clientHeight;
			var scrollTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
			var scrollHeight = document.documentElement.scrollTop === 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;

			if (scrollHeight-scrollTop-self.params.distance <= window.innerHeight) {
	        	isToBottom = true;
	        } else{
	        	isToBottom = false;
	        }
        	callback({
    			"scrollTop":scrollTop,
    			"isToBottom":isToBottom
    		})
		},
        extend: function(a, b) {
			for (var key in b) {
			  	if (b.hasOwnProperty(key)) {
			  		a[key] = b[key];
			  	}
		  	}
		  	return a;
		}
	}
	window.pageScroll = pageScroll;
})(window);