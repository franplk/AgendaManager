/*
 * JavaScript Regxp Library
 * JS 正则类库
 * */
(function(w) {

	var u = {};

	/*校验是否全由数字组成 */
	u.isNumber = function(str) {
		var reg = /^[0-9]$/;
		return reg.test(str);
	};

	/*校验是否为浮点数 */
	u.isFloat = function(number) {
		var regExp = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
		return regExp.test(number);
	};
	
	/* 是否为合法的Emali地址 */
	u.isValidEmail = function (emailUrl) {
		var regExp = /^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$/;
		return regExp.test(emailUrl);
	};

	window.$regxp = u;

})(window);
